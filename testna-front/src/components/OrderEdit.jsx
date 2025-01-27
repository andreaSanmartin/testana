import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import PerButton from './PerButton';

const OrderEdit = () => {
  const { state } = useLocation();
  const { order } = state || {};

  const [formData, setFormData] = useState(order || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.ho_name) {
      newErrors.ho_name = 'El nombre del cliente es obligatorio';
    }
    if (!formData.ho_ruc) {
      newErrors.ho_ruc = 'El RUC del cliente es obligatorio';
    }
    if (!formData.ho_date_registration) {
      newErrors.ho_date_registration = 'La fecha de registro es obligatoria';
    }
    if (!formData.ho_state) {
      newErrors.ho_state = 'El estado de la orden es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Formulario enviado:', formData);

      navigate(`/orders/list`);
    }
  };

  if (!order) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Editar Orden {order.ho_code}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ho_name">Nombre Cliente</label>
          <input
            type="text"
            id="ho_name"
            name="ho_name"
            value={formData.ho_name || ''}
            onChange={handleChange}
            className="input"
          />
          {errors.ho_name && <p className="text-red-500">{errors.ho_name}</p>}
        </div>
        
        <div>
          <label htmlFor="ho_ruc">RUC Cliente</label>
          <input
            type="text"
            id="ho_ruc"
            name="ho_ruc"
            value={formData.ho_ruc || ''}
            onChange={handleChange}
            className="input"
          />
          {errors.ho_ruc && <p className="text-red-500">{errors.ho_ruc}</p>}
        </div>

        <div>
          <label htmlFor="ho_date_registration">Fecha de Registro</label>
          <input
            type="date"
            id="ho_date_registration"
            name="ho_date_registration"
            value={formData.ho_date_registration || ''}
            onChange={handleChange}
            className="input"
          />
          {errors.ho_date_registration && <p className="text-red-500">{errors.ho_date_registration}</p>}
        </div>

        <div>
          <label htmlFor="ho_state">Estado</label>
          <input
            type="text"
            id="ho_state"
            name="ho_state"
            value={formData.ho_state || ''}
            onChange={handleChange}
            className="input"
          />
          {errors.ho_state && <p className="text-red-500">{errors.ho_state}</p>}
        </div>

        <div className="flex justify-end mt-4">
          <PerButton
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            <FaSave className="mr-2" />
            Guardar
          </PerButton>
        </div>
      </form>
    </div>
  );
};

export default OrderEdit;
