import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import fond from '../assets/rent_font.jpg';
import HeaderMenu from './HeaderMenu';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { FromEnum } from '../enums/FromEnum';
import { saveRent } from '../clients/services/Forms';
import OutlinedRoundedButton from './OutlinedRoundedButton';
import { BsFillSendFill } from "react-icons/bs";
import { TypeDivisionEnum } from '../enums/TypeDivisionEnum';
import { getTypesAssets } from '../clients/services/AssetService';
import { getDivision, getDivisionByFather } from '../employees/services/PersonService';
import { useAlert } from './AlertContext';
import TooltipPer from './Tooltip';
import { ProjectEnum } from '../enums/ProjectEnum';
import { handleCall, handleEmailSend, handleWhatsappSend } from '../models/SendMessages';
import BlackButton from './PerButton';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Rents = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [listProvince, setListProvince] = useState([]);
    const [listCanton, setListCanton] = useState([]);
    const [listParish, setListParish] = useState([]);
    const [assetTypes, setAssetTypes] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const shareText = `Hola, necesito información de lso requerimientos para un proyecto propio`;
    const contact = "593981731835";
    const subject = "Consulta para construir proyecto propio";

    useEffect(() => {
        const fetchData = async () => {
            const assets = await getTypesAssets();
            const listProvince = await getDivision(TypeDivisionEnum.PROVINCE);

            setAssetTypes(assets);
            setListProvince(listProvince);
        };

        fetchData();
    }, []);

    const onSubmit = (data) => {
        setLoading(true);

        const finalData = {
            ...data,
            gfr_cod_form: FromEnum.RENT,
            gfr_cod_project: ProjectEnum.WEB
        };

        try {
            saveRent(finalData);
            showAlert('Enviado Correctamente', 'success');
        } catch (error) {
            showAlert('Error en al enviar su información, intente nuevamente.' + error, 'error');
        } finally {
            setLoading(false);
            reset();
        }
    };

    const handleChangePolitical = async (event) => {
        const { id, value } = event.target;

        if (value) {
            try {
                const divisions = await getDivisionByFather(value);

                if (id === "gfr_province") {
                    setListCanton(divisions);
                    setListParish([]);
                } else if (id === "gfr_canton") {
                    setListParish(divisions);
                }
            } catch (error) {
                showAlert('Error al obtener llas divisiones ' + error.message, 'error');
            }
        }
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
                <HeaderMenu />
                <div className="relative mx-auto pt-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 bg-transparent text-black p-2 rounded-full shadow-custom-gold mt-20"
                        aria-label="Volver"
                    >
                        <MdArrowBack size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center justify-center bg-cover bg-center">
                        <div className="m-14 rounded-lg shadow-custom-gold text-center bg-white p-8">
                            <h2 className="text-2xl font-bold">Completa este formulario y un asesor inmobiliario se comunicará contigo.</h2>
                        </div>

                        <div className="rounded-lg shadow-custom-gold m-8 bg-white">
                            <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg shadow-custom-gold">
                                <div className="bg-black text-white text-center p-4 rounded-t-lg">
                                    <h2 className="text-3xl font-bold">Rento Propiedad</h2>
                                </div>
                                <div className="p-4 bg-white rounded-b-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="gfr_name" className="block text-xl font-bold mb-2">Nombre</label>
                                            <input
                                                type="text"
                                                id="gfr_name"
                                                {...register("gfr_name", { required: true })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.gfr_name && <span className="text-red-500">Este campo es requerido</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="gfr_last_name" className="block text-xl font-bold mb-2">Apellido</label>
                                            <input
                                                type="text"
                                                id="gfr_last_name"
                                                {...register("gfr_last_name", { required: true })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.gfr_last_name && <span className="text-red-500">Este campo es requerido</span>}

                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="gfr_address" className="block text-xl font-bold mb-2">Dirección</label>
                                            <input
                                                type="text"
                                                id="gfr_address"
                                                {...register("gfr_address", { required: true })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.gfr_address && <span className="text-red-500">Este campo es requerido</span>}

                                        </div>
                                        <div>
                                            <label htmlFor="gfr_mail" className="block text-xl font-bold mb-2">
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                id="gfr_mail"
                                                {...register("gfr_mail", {
                                                    required: true,
                                                    validate: (value) => value.includes('@') || "Debe incluir un '@' en el correo"
                                                })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.gfr_mail && <span className="text-red-500">Este campo es requerido</span>}

                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="gfr_phone" className="block text-xl font-bold mb-2">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="gfr_phone"
                                                {...register("gfr_phone", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        gfp_message: "El teléfono debe contener solo números"
                                                    }
                                                })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.gfr_phone && <span className="text-red-500">Este campo es requerido</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="gfr_asset" className="block  text-xl font-bold mb-2">
                                                Tipo Propiedad
                                            </label>
                                            <select
                                                id="gfr_asset"
                                                {...register("gfr_asset", { required: true })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Seleccione una</option>
                                                {assetTypes.map(asset => (
                                                    <option key={asset.gta_code} value={asset.gta_code}>{asset.gta_name}</option>
                                                ))}
                                            </select>
                                            {errors.gfr_asset && <span className="text-red-500">Este campo es requerido</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="gfr_price" className="block  text-xl font-bold mb-2">
                                                Precio
                                            </label>
                                            <input
                                                type="text"
                                                id="gfr_price"
                                                {...register("gfr_price", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^\d+(\.\d{1,2})?$/,
                                                        message: "El precio debe ser un número válido con hasta dos decimales"
                                                    }
                                                })}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.gfr_price && <span className="text-red-500">Este campo es requerido</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="gfr_province" className="block  text-xl font-bold mb-2">
                                                Provincia
                                            </label>

                                            <select
                                                id="gfr_province"
                                                {...register("gfr_province", { required: true })}
                                                onChange={handleChangePolitical}
                                                className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Seleccione una</option>
                                                {listProvince.map(st => (
                                                    <option key={st.gpd_code} value={st.gpd_code}>{st.gpd_name}</option>
                                                ))}
                                            </select>
                                            {errors.gfr_province && <span className="text-red-500">Este campo es requerido</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {listCanton.length > 0 && (
                                            <div>
                                                <label htmlFor="gfr_canton" className="block  text-xl font-bold mb-2">
                                                    Canton
                                                </label>

                                                <select
                                                    id="gfr_canton"
                                                    {...register("gfr_canton", { required: true })}
                                                    onChange={handleChangePolitical}
                                                    className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Seleccione uno</option>
                                                    {listCanton.map(st => (
                                                        <option key={st.gpd_code} value={st.gpd_code}>{st.gpd_name}</option>
                                                    ))}
                                                </select>
                                                {errors.gfr_canton && <span className="text-red-500">{errors.ass_province.message}</span>}
                                            </div>
                                        )}
                                        {listParish.length > 0 && (
                                            <div>
                                                <label htmlFor="gfr_parish" className="block  text-xl font-bold mb-2">
                                                    Parroquia
                                                </label>

                                                <select
                                                    id="gfr_parish"
                                                    {...register("gfr_parish")}
                                                    className="shadow appearance-none   rounded w-full bg-[#939393] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Seleccione una</option>
                                                    {listParish.map(st => (
                                                        <option key={st.gpd_code} value={st.gpd_code}>{st.gpd_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-center mb-4">
                                        <div className="pt-4">
                                            <TooltipPer text="Enviar información">
                                                <OutlinedRoundedButton text="Comunicarme" Icon={BsFillSendFill} type="submit" loading={loading} bg="#000000" />
                                            </TooltipPer>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <BlackButton text="Llamar" Icon={FaPhone} onClick={() => handleCall(contact)} bg="#128C7E" />
                                        <BlackButton text="WhatsApp" Icon={FaWhatsapp} onClick={() => handleWhatsappSend(shareText, contact)} bg="#25D366" />
                                        <BlackButton text="Correo" Icon={FaEnvelope} onClick={() => handleEmailSend(subject, shareText)} bg="#DB4437" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
                <Footer />
            </div>
        </div >
    )
}

export default Rents;