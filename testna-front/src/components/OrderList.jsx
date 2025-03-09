import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import OrderDetail from "./OrderDetail";
import Slider from "./Slider";
import { getAllOrders } from "../services/OrderService";
import fond from '../assets/font_list.jpg';
import { Link } from "react-router-dom";
import './OrderList.css'; 

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
    <div className="order-list-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${fond})` }}
      ></div>
      <div className="content-wrapper">
        <Slider />
        <div className="orders-container">
          <h1 className="orders-header">Órdenes de compra</h1>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre Cliente</th>
                <th>RUC Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.ho_code}>
                  <td>{order.ho_code}</td>
                  <td>{order.ho_name}</td>
                  <td>{order.ho_ruc}</td>
                  <td>{new Date(order.ho_date_registration).toLocaleDateString('es-ES')}</td>
                  <td>{order.ho_state_name}</td>
                  <td className="actions-container">
                    <button onClick={() => setSelectedOrder(order)} className="action-button">
                      <FaEye className="icon-view" />
                    </button>
                    <Link
                      to={`/orders/edit/${order.ho_code}`}
                      state={{ order }} 
                      className="action-button"
                    >
                      <FaEdit className="icon-edit" />
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
