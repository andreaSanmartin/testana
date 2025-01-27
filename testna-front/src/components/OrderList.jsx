import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import OrderDetail from "./OrderDetail";
import Slider from "./Slider";
import { getAllOrders } from "../services/OrderService";
import fond from '../assets/font_list.jpg';
import { Link } from "react-router-dom";

const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const order = await getAllOrders();
      console.log(order);
      setOrders(order);
    };

    fetchData();
  }, []);

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
          <h1 className="text-2xl font-bold">Órdenes de compra</h1>
          <table className="w-full border-collapse my-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Código</th>
                <th className="border px-4 py-2">Nombre Cliente</th>
                <th className="border px-4 py-2">RUC Cliente</th>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.ho_code}>
                  <td className="border px-4 py-2">{order.ho_code}</td>
                  <td className="border px-4 py-2">{order.ho_name}</td>
                  <td className="border px-4 py-2">{order.ho_ruc}</td>
                  <td className="border px-4 py-2">{new Date(order.ho_date_registration).toLocaleDateString('es-ES')}</td>
                  <td className="border px-4 py-2">{order.ho_state_name}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <button onClick={() => setSelectedOrder(order)}
                      className="mx-4">
                      <FaEye className="text-blue-500 py-4 h-full" />
                    </button>
                    <Link
                      to={{
                        pathname: `/orders/edit/${order.ho_code}`,
                        state: { order }
                      }}
                    >
                      <FaEdit className="text-green-500 py-4 h-full" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedOrder && selectedOrder.ho_items && selectedOrder.ho_items.length > 0 && (
            <OrderDetail
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
