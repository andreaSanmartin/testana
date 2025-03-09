import React from "react";
import './OrderDetail.css';

const OrderDetail = ({ order, onClose }) => {
  const items = order.ho_items || [];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Detalle de la orden</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Codigo barras</th>
              <th>Valor Unitario</th>
              <th>Cantidad</th>
              <th>Valor con IVA</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.ho_cod_item}</td>
                <td>{item.ho_item_name || "Producto desconocido"}</td>
                <td>{item.ho_item_bar || "00000000"}</td>
                <td>{item.ho_price ? item.ho_price.toFixed(2) : "0.00"}</td>
                <td>{item.ho_amount}</td>
                <td>{item.ho_total_item ? item.ho_total_item.toFixed(2) : "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-container">
          <label>Subtotal: </label>
          <span>{order.ho_subtotal ? order.ho_subtotal.toFixed(2) : "0.00"}</span>
        </div>
        <div className="total-container">
          <label>Total: </label>
          <span className="font-bold">{order.ho_total ? order.ho_total.toFixed(2) : "0.00"}</span>
        </div>
        {order.ho_iva && (
          <div className="total-container">
            <label>IVA</label>
            <input
              type="checkbox"
              checked={order.ho_iva}
              className="ml-2"
              readOnly
            />
          </div>
        )}
        <button
          className="close-button"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;