import React from "react";

const OrderDetail = ({ order, onClose }) => {
  const items = order.ho_items || []; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 w-3/4">
        <h2 className="text-xl font-bold">Detalle de la orden</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Código</th>
              <th className="border px-4 py-2">Producto</th>
              <th className="border px-4 py-2">Codigo barras</th>
              <th className="border px-4 py-2">Valor Unitario</th>
              <th className="border px-4 py-2">Cantidad</th>
              <th className="border px-4 py-2">Valor con IVA</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.ho_cod_item}</td>
                <td className="border px-4 py-2">{item.ho_item_name || "Producto desconocido"}</td>
                <td className="border px-4 py-2">{item.ho_item_bar || "00000000"}</td>  
                <td className="border px-4 py-2">{item.ho_price ? item.ho_price.toFixed(2) : "0.00"}</td>
                <td className="border px-4 py-2">{item.ho_amount}</td>
                <td className="border px-4 py-2">{item.ho_total_item ? item.ho_total_item.toFixed(2) : "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <label>Subtotal: </label>
          <span>{order.ho_subtotal ? order.ho_subtotal.toFixed(2) : "0.00"}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <label>Total: </label>
          <span className="font-bold">{order.ho_total ? order.ho_total.toFixed(2) : "0.00"}</span>
        </div>
        {order.ho_iva && (
          <div className="mt-4 flex justify-end">
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
          className="mt-4 p-2 bg-blue-500 text-white"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
