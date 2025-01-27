import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer />
  </>
);
