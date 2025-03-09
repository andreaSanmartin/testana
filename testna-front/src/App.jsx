import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { AlertProvider } from './components/AlertContext';
import OrderEdit from './components/OrderEdit';

const App = () => {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OrderForm />} />
          <Route path="list" element={<OrderList />} />
          <Route path="/orders/edit/:orderCode" element={<OrderEdit />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
};

export default App; 
