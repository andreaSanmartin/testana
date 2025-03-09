import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaSave } from "react-icons/fa";
import Slider from "./Slider";
import fond from '../assets/font_clean.jpg';
import { useForm } from "react-hook-form";
import PerButton from "./PerButton";
import { useAlert } from './AlertContext';
import { getByDataClient, getFirstClient } from "../services/ClientsService";
import { getByDataItem, getFirstItem } from "../services/ItemsService";
import { getCodeOrder, saveOrder } from "../services/OrderService";
import { getAllStatus } from "../services/StatusService";
import './OrderForm.css';

const OrderForm = () => {
    const { showAlert } = useAlert();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [clients, setClients] = useState([]);
    const [listStatus, setListStatus] = useState([]);
    const [code, setCode] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [items, setItems] = useState([
        { product: "", unitValue: 0, quantity: 0, total: 0, barcode: "", subtotal: 0 }
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [subtotal, setSubtotal] = useState(0);
    const [iva, setIva] = useState(false);
    const [total, setTotal] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [error, setError] = useState("");
    const [searchTermClient, setSearchTermClient] = useState("");

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const debouncedSearchClient = debounce(async (term) => {
        if (term.trim() === "") {
            const initialClients = await getFirstClient();
            setClients(initialClients);
            return;
        }
        const filteredClients = await getByDataClient(term);
        setClients(filteredClients);
    }, 2000);

    useEffect(() => {
        const fetchData = async () => {
            const clients = await getFirstClient();
            const items = await getFirstItem();
            const codeOrder = await getCodeOrder();
            const statusLi = await getAllStatus();

            setClients(clients);
            setListItems(items);
            setCode(codeOrder);
            setListStatus(statusLi);
        };

        fetchData();
    }, []);

    const addItem = () => {
        setItems([...items, { product: "", unitValue: 0, quantity: 0, total: 0, barcode: "", subtotal: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        calculateTotals(newItems);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        const product = listItems.find(p => p.it_description === newItems[index].product);

        if (field === "quantity") {
            if (product && value > product.it_stock) {
                showAlert(`La cantidad ingresada supera el stock disponible (${product.it_stock})`, 'error');
                return;
            }
            newItems[index].subtotal = newItems[index].unitValue * value;
            newItems[index].total = iva ? (newItems[index].it_value_iva > 0 ? newItems[index].subtotal * (newItems[index].it_value_iva) : newItems[index].subtotal) : newItems[index].subtotal;
        }

        newItems[index][field] = value;
        setItems(newItems);
        calculateTotals(newItems);
    };

    const searchProducts = async (term) => {
        if (term.trim() === "") return;
        const data = await getByDataItem(term);
        setListItems(data);
    };

    const debouncedSearch = debounce(searchProducts, 2000);

    useEffect(() => {
        if (/^\d+$/.test(searchTerm)) {
            debouncedSearch(searchTerm);
            setError("");
        } else if (searchTerm.trim() !== "") {
            setError("Buscar solo por código de barras o código del producto (solo números).");
        }
    }, [searchTerm]);

    const handleProductChange = (index, product) => {
        const isDuplicate = items.some((item, i) => i !== index && item.product === product.it_description);
        if (isDuplicate) {
            showAlert("Este producto ya está en la lista.", 'error');
            return;
        }

        const newItems = [...items];
        newItems[index].product = product.it_description;
        newItems[index].unitValue = product.it_price;
        newItems[index].barcode = product.it_bar_code;
        newItems[index].it_value_iva = product.it_value_iva;
        newItems[index].subtotal = product.it_price * newItems[index].quantity;
        newItems[index].total = iva ? (product.it_value_iva > 0 ? newItems[index].subtotal * (product.it_value_iva): newItems[index].subtotal) : newItems[index].subtotal;
        setItems(newItems);
        calculateTotals(newItems);
    };

    const calculateTotals = (items) => {
        const newSubtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const newTotal = items.reduce((sum, item) => sum + item.total, 0);
        setSubtotal(newSubtotal);
        setTotal(newTotal);
    };

    useEffect(() => {
        const newItems = items.map(item => ({
            ...item,
            total: iva ? (item.it_value_iva > 0 ? item.subtotal * (item.it_value_iva) : item.subtotal) : item.subtotal,
        }));
        setItems(newItems);
        calculateTotals(newItems);
    }, [iva]);

    useEffect(() => {
        debouncedSearchClient(searchTermClient);
    }, [searchTermClient]);

    const handleSearchClientChange = (e) => {
        const term = e.target.value;
        setSearchTermClient(term);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const invalidItems = items.filter(item => !item.product);
        if (invalidItems.length > 0) {
            showAlert('Debe seleccionar al menos un producto.', 'error');
            setLoading(false);
            return;
        }

        const finalData = {
            ho_code: code,
            ho_cod_client: data.ho_cod_client,
            ho_date_registration: date,
            ho_state: data.ho_state,
            ho_subtotal: subtotal,
            ho_iva: iva,
            ho_total: total,
            ho_items: items.map(item => ({
                ho_cod_item: listItems.find(p => p.it_description === item.product)?.it_code || 0,
                ho_amount: item.quantity,
                ho_price: item.unitValue,
                ho_total_item: item.total,
                ho_sub_total_item: item.subtotal,
            }))
        };

        try {
            await saveOrder(finalData);
            showAlert('Enviado Correctamente', 'success');
        } catch (error) {
            showAlert('Error al enviar su información, intente nuevamente.' + error, 'error');
        } finally {
            resetForm();
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCode(1);
        setDate(new Date().toISOString().split("T")[0]);
        setSubtotal(0);
        setIva(false);
        setTotal(0);
        setItems([{ product: "", unitValue: 0, quantity: 0, total: 0, barcode: "", subtotal: 0 }]);
        setSearchTerm("");
        setSearchTermClient("");
        setClients([]);
        setListItems([]);
        setListStatus([]);
        setIsDropdownOpen(null);
        setError("");
        reset();
    };

    return (
        <div className="container">
            <div className="background"></div>
            <div className="slider-container">
                <Slider />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="header">
                        <h1>Orden de compra</h1>
                        <div>
                            <span>Código: </span>
                            <span>{code}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Cliente:</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Buscar cliente..."
                                value={searchTermClient}
                                onChange={handleSearchClientChange}
                            />
                            <select
                                id="ho_cod_client"
                                {...register("ho_cod_client", { required: true })}
                                className="select-field"
                            >
                                {clients.map(cli => (
                                    <option key={cli.cl_code} value={cli.cl_code}>{cli.cl_name}</option>
                                ))}
                            </select>
                            {errors.ho_cod_client && <span className="error-message">Este campo es requerido</span>}
                        </div>
                        <div>
                            <label>Fecha:</label>
                            <input
                                type="date"
                                id="ho_date_registration"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                {...register("ho_date_registration", { required: true })}
                                className="input-field"
                            />
                            {errors.ho_date_registration && <span className="error-message">Este campo es requerido</span>}
                        </div>
                        <div>
                            <label>Estado:</label>
                            <select
                                id="ho_state"
                                {...register("ho_state", { required: true })}
                                className="select-field"
                            >
                                <option value="">Seleccione uno</option>
                                {listStatus.map(st => (
                                    <option key={st.st_code} value={st.st_code}>{st.st_name}</option>
                                ))}
                            </select>
                            {errors.ho_state && <span className="error-message">Este campo es requerido</span>}
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>N</th>
                                    <th>Producto</th>
                                    <th>Código de barras</th>
                                    <th>Valor Unitario</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="input-field"
                                                value={isDropdownOpen === index ? searchTerm : item.product} 
                                                onClick={() => setIsDropdownOpen(index)}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setIsDropdownOpen(index);
                                                }}
                                                onBlur={() => {
                                                    setTimeout(() => setIsDropdownOpen(null), 200);
                                                }}
                                                placeholder="Buscar producto..."
                                            />
                                            {error && isDropdownOpen === index && (
                                                <p className="error-message">{error}</p>
                                            )}
                                            {isDropdownOpen === index && (
                                                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                                                    {listItems.map((product) => (
                                                        <li
                                                            key={product.it_code}
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                handleProductChange(index, product);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            {product.it_description}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="input-field"
                                                value={item.barcode}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="input-field"
                                                value={item.unitValue}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="input-field"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                                            />
                                        </td>
                                        <td>{item.subtotal.toFixed(2)}</td>
                                        <td>{item.total.toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => removeItem(index)}>
                                                <FaMinus className="text-red-500" />
                                            </button>
                                            <button type="button" onClick={addItem}>
                                                <FaPlus className="text-blue-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="total-container">
                            <span>Subtotal: </span>
                            <span>{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="total-container">
                            <label>IVA: </label>
                            <input
                                type="checkbox"
                                checked={iva}
                                onChange={(e) => setIva(e.target.checked)}
                            />
                        </div>
                        <div className="total-container">
                            <span>Total: </span>
                            <span>{total.toFixed(2)}</span>
                        </div>
                        <div className="save-button">
                            <PerButton text="Guardar" Icon={FaSave} type="submit" loading={loading} bg="#000000" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;