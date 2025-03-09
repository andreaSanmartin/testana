import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PerButton from "./PerButton";
import { FaMinus, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import { updateOrder } from "../services/OrderService";
import { getFirstClient, getByDataClient } from "../services/ClientsService";
import { getFirstItem, getByDataItem } from "../services/ItemsService";
import { getAllStatus } from "../services/StatusService";
import { useAlert } from "./AlertContext";
import fond from "../assets/font_clean.jpg";
import "./OrderEdit.css";

const OrderEdit = () => {
  const { state } = useLocation();
  const { order: originalOrder } = state || {};
  const order = originalOrder
    ? {
        ...originalOrder,
        ho_items: originalOrder.ho_items.map((item) => ({
          product: item.ho_item_name,
          unitValue: item.ho_price,
          quantity: item.ho_amount,
          total: item.ho_total_item,
          barcode: item.ho_item_bar,
          subtotal: item.ho_sub_total_item,
          it_value_iva: item.ho_iva ? 0.12 : 0,
        })),
      }
    : null;
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    ho_code: order?.ho_code || "",
    ho_cod_client: order?.ho_cod_client || "",
    ho_date_registration: order?.ho_date_registration
      ? order.ho_date_registration.split("T")[0]
      : "",
    ho_state: order?.ho_state || "",
    ho_name: order?.ho_name || "",
    ho_ruc: order?.ho_ruc || "",
    ho_subtotal: order?.ho_subtotal || 0,
    ho_iva: order?.ho_iva || false,
    ho_total: order?.ho_total || 0,
  });

  const [clients, setClients] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  const [items, setItems] = useState(order?.ho_items || []);
  const [subtotal, setSubtotal] = useState(order?.ho_subtotal || 0);
  const [iva, setIva] = useState(order?.ho_iva || false);
  const [total, setTotal] = useState(order?.ho_total || 0);
  const [searchTermClient, setSearchTermClient] = useState("");
  const [searchTermProduct, setSearchTermProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await getFirstClient();
        const items = await getFirstItem();
        const status = await getAllStatus();

        setClients(clients);
        setListItems(items);
        setListStatus(status);
      } catch (error) {
        console.error("Error fetching data:", error);
        showAlert("Error al cargar los datos adicionales", "error");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    const product = listItems.find(
      (p) => p.it_description === newItems[index].product
    );
    if (field === "product") {
      newItems[index].product = value;
    } else if (field === "quantity") {
      if (product && value > product.it_stock) {
        showAlert(
          `La cantidad ingresada supera el stock disponible (${product.it_stock})`,
          "error"
        );
        return;
      }
      newItems[index].subtotal = newItems[index].unitValue * value;
      newItems[index].total = iva
        ? newItems[index].subtotal * (1 + newItems[index].it_value_iva)
        : newItems[index].subtotal;
    }

    newItems[index][field] = value;
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
    const newItems = items.map((item) => ({
      ...item,
      total: iva ? item.subtotal * (1 + item.it_value_iva) : item.subtotal,
    }));
    setItems(newItems);
    calculateTotals(newItems);
  }, [iva]);

  const handleSearchClientChange = async (term) => {
    setSearchTermClient(term);
    if (term.trim() === "") {
      const initialClients = await getFirstClient();
      setClients(initialClients);
    } else {
      const filteredClients = await getByDataClient(term);
      setClients(filteredClients);
    }
  };

  const handleSearchProductChange = async (term) => {
    setSearchTermProduct(term);
    if (term.trim() === "") {
      const initialItems = await getFirstItem();
      setListItems(initialItems);
    } else {
      const filteredItems = await getByDataItem(term);
      setListItems(filteredItems);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        product: "",
        unitValue: 0,
        quantity: 0,
        total: 0,
        barcode: "",
        subtotal: 0,
        it_value_iva: 0.12,
      },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotals(newItems);
  };

  const handleProductChange = (index, product) => {
    const newItems = [...items];
    newItems[index].product = product.it_description;
    newItems[index].unitValue = product.it_price;
    newItems[index].barcode = product.it_bar_code;
    newItems[index].it_value_iva = product.it_value_iva;
    newItems[index].subtotal = product.it_price * newItems[index].quantity;
    newItems[index].total = iva
      ? newItems[index].subtotal * (1 + product.it_value_iva)
      : newItems[index].subtotal;
    setItems(newItems);
    calculateTotals(newItems);
    setIsDropdownOpen(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ho_cod_client: formData.ho_cod_client,
      ho_cod_detail: order?.ho_cod_detail || 0,
      ho_code: formData.ho_code,
      ho_date_registration: formData.ho_date_registration,
      ho_state: formData.ho_state,
      ho_name: formData.ho_name,
      ho_ruc: formData.ho_ruc,
      ho_subtotal: subtotal,
      ho_iva: iva,
      ho_total: total,
      ho_items: items.map((item) => ({
        ho_cod_item:
          listItems.find((p) => p.it_description === item.product)?.it_code ||
          0,
        ho_amount: item.quantity,
        ho_price: item.unitValue,
        ho_total_item: item.total || 0,
        ho_sub_total_item: item.subtotal || 0,
        ho_item_name: item.product,
        ho_item_bar: item.barcode,
        ho_code_i: formData.ho_code,
      })),
    };

    try {
      await updateOrder(finalData);
      showAlert("Orden actualizada correctamente", "success");
      navigate("/orders/list");
    } catch (error) {
      console.error("Error updating order:", error);
      showAlert("Error al actualizar la orden", "error");
    }
  };

  const handleCancel = () => {
    navigate("/list");
  };

  if (!order) {
    return <p>No se encontró la orden.</p>;
  }

  return (
    <div className="order-list-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${fond})` }}
      ></div>
      <div className="content-wrapper">
        <h1 className="header">Editar Orden {formData.ho_code}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cliente:</label>
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTermClient}
              onChange={(e) => handleSearchClientChange(e.target.value)}
            />
            <select
              name="ho_cod_client"
              value={formData.ho_cod_client || ""}
              onChange={handleChange}
            >
              {clients.map((cli) => (
                <option key={cli.cl_code} value={cli.cl_code}>
                  {cli.cl_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="ho_date_registration"
              value={formData.ho_date_registration || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <select
              name="ho_state"
              value={formData.ho_state || ""}
              onChange={handleChange}
            >
              {listStatus.map((st) => (
                <option key={st.st_code} value={st.st_code}>
                  {st.st_name}
                </option>
              ))}
            </select>
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
                      value={item.product || ""}
                      onChange={(e) =>
                        handleItemChange(index, "product", e.target.value)
                      }
                      onClick={() => setIsDropdownOpen(index)}
                      onBlur={() => setTimeout(() => setIsDropdownOpen(null), 200)}
                    />
                    {isDropdownOpen === index && (
                      <ul className="dropdown">
                        {listItems.map((product) => (
                          <li
                            key={product.it_code}
                            onClick={() => handleProductChange(index, product)}
                          >
                            {product.it_description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <input type="text" value={item.barcode || ""} readOnly />
                  </td>
                  <td>
                    <input type="number" value={item.unitValue || 0} readOnly />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity || 0}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>{(item.subtotal || 0).toFixed(2)}</td>
                  <td>{(item.total || 0).toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => removeItem(index)}>
                      <FaMinus />
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
            <PerButton
              text="Guardar"
              Icon={FaSave}
              type="submit"
              loading={loading}
              bg="#000000"
            />
          </div>
          <div className="cancel-button">
            <PerButton
              text="Cancelar"
              Icon={FaTimes}
              onClick={handleCancel}
              type="button"
              loading={loading}
              bg="#cb0c0c"
            />
          </div>
        </form>
        <button type="button" onClick={addItem} className="add-item-button">
          <FaPlus /> Agregar Producto
        </button>
      </div>
    </div>
  );
};

export default OrderEdit;