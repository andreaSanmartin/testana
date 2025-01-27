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
        { product: "", unitValue: 0, quantity: 0, total: 0, barcode: "", subtotal: 0 }]);
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

    //general
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

    //product
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
            newItems[index].total = iva ? newItems[index].subtotal * (1 + newItems[index].it_value_iva) : newItems[index].subtotal;
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
        newItems[index].total = iva ? newItems[index].subtotal * (1 + product.it_value_iva) : newItems[index].subtotal;
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
            total: iva ? item.subtotal * (item.it_value_iva) : item.subtotal,
        }));
        setItems(newItems);
        calculateTotals(newItems);
    }, [iva]);

    //client
    useEffect(() => {
        debouncedSearchClient(searchTermClient);
    }, [searchTermClient]);

    const handleSearchClientChange = (e) => {
        const term = e.target.value;
        setSearchTermClient(term);
    };


    //save form 
    const onSubmit = async(data) => {
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
        <div className="relative text-title">
            <div
                style={{
                    backgroundImage: `url(${fond})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    filter: 'blur(5px)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            ></div>
            <div className="bg-tranparent">
                <Slider />
                <div className="max-w-5xl mx-auto p-4 bg-white shadow rounded text-title mt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg shadow-custom-gold">
                        <div className="bg-black text-white text-center p-4 rounded-t-lg">
                            <h1 className="text-2xl font-bold">Orden de compra</h1>
                            <div>
                                <span className="font-bold">Código: </span>
                                <span>{code}</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-b-lg">
                            <div className="mt-4">
                                <label htmlFor="ho_cod_client" className="block  text-xl font-bold mb-2">
                                    Cliente:
                                </label>
                                <input
                                    type="text"
                                    className="w-full border p-2 mb-2"
                                    placeholder="Buscar cliente..."
                                    value={searchTermClient}
                                    onChange={handleSearchClientChange}
                                />
                                <select
                                    id="ho_cod_client"
                                    {...register("ho_cod_client", { required: true })}
                                    className="shadow appearance-none rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    {clients.map(cli => (
                                        <option key={cli.cl_code} value={cli.cl_code}>{cli.cl_name}</option>
                                    ))}
                                </select>
                                {errors.ho_cod_client && <span className="text-red-500">Este campo es requerido</span>}
                            </div>
                            <div className="mt-4">
                                <label className="block">Fecha:</label>
                                <input
                                    type="date"
                                    id="ho_date_registration"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    {...register("ho_date_registration", { required: true })}
                                    className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.gfr_address && <span className="text-red-500">Este campo es requerido</span>}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="ho_state" className="block  text-xl font-bold mb-2">
                                    Estado:
                                </label>
                                <select
                                    id="ho_state"
                                    {...register("ho_state", { required: true })}
                                    className="shadow appearance-none rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Seleccione uno</option>
                                    {listStatus.map(st => (
                                        <option key={st.st_code} value={st.st_code}>{st.st_name}</option>
                                    ))}
                                </select>
                                {errors.ho_state && <span className="text-red-500">Este campo es requerido</span>}
                            </div>
                            <div className="mt-4">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">N</th>
                                            <th className="border px-4 py-2">Producto</th>
                                            <th className="border px-4 py-2">Código de barras</th>
                                            <th className="border px-4 py-2">Valor Unitario</th>
                                            <th className="border px-4 py-2">Cantidad</th>
                                            <th className="border px-4 py-2">Subtotal</th>
                                            <th className="border px-4 py-2">Total</th>
                                            <th className="border px-4 py-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{index + 1}</td>
                                                <td className="border px-4 py-2 relative">
                                                    <input
                                                        type="text"
                                                        className="w-full border p-1"
                                                        value={item.product}
                                                        onClick={() => setIsDropdownOpen(index)}
                                                        onChange={(e) => {
                                                            setSearchTerm(e.target.value);
                                                            setIsDropdownOpen(index);
                                                        }}
                                                        onBlur={() => {
                                                            setTimeout(() => setIsDropdownOpen(null), 200);
                                                        }}
                                                        placeholder="Buscar por código de barras o código del producto..."
                                                    />
                                                    {error && isDropdownOpen === index && (
                                                        <p className="text-red-500 text-sm mt-1">{error}</p>
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
                                                <td className="border px-4 py-2">
                                                    <input
                                                        type="text"
                                                        className="border p-1 w-full"
                                                        value={item.barcode}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <input
                                                        type="number"
                                                        className="border p-1 w-full"
                                                        value={item.unitValue}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <input
                                                        type="number"
                                                        className="border p-1 w-full"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                                                    />
                                                </td>
                                                <td className="border px-4 py-2">{item.subtotal.toFixed(2)}</td>
                                                <td className="border px-4 py-2">{item.total.toFixed(2)}</td>
                                                <td className="border px-4 py-2 flex justify-center">
                                                    <button onClick={() => removeItem(index)}>
                                                        <FaMinus className="text-red-500 h-full" />
                                                    </button>
                                                    <button type="button" onClick={addItem}>
                                                        <FaPlus className="text-blue-500 py-4 h-full" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <div className="flex items-center">
                                    <label>Subtotal: </label>
                                    <span className="ml-2">{subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <div className="flex items-center">
                                    <label>IVA: </label>
                                    <input
                                        type="checkbox"
                                        checked={iva}
                                        onChange={(e) => setIva(e.target.checked)}
                                        className="ml-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <div className="flex items-center">
                                    <label>Total: </label>
                                    <span className="font-bold ml-2">{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mb-4">
                                <PerButton text="Guardar" Icon={FaSave} type="submit" loading={loading} bg="#000000" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;