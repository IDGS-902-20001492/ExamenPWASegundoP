import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const Home = () => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    const verificarVacio = () => {
        if (query === "") {
            Swal.fire({
                title: "Error",
                text: "El campo de búsqueda no puede estar vacío",
                icon: "warning",
                button: "Aceptar",
            });
        } else {
            navigate(`/result/${query}`);
        }
    }

    return (
        <div className="exterior">
            <div className="container-principal">
                <div className="titilo">
                    <p className="icono">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H69.5c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H199.7c-11.5 0-21.4-8.2-23.6-19.5L170.7 288H459.2c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32H360V134.1l23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23V32H120.1C111 12.8 91.6 0 69.5 0H24zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" /></svg>
                    </p>
                    <h1>Bazar Online</h1>
                </div>
                <div className="sub-titulo">
                    <p>Aquí encontrarás los mejores precios</p>
                </div>
                <div className="container-busqueda">
                    <input className="input-busqueda" type="text" placeholder="Buscar producto"
                        onKeyUp={handleSearch} />
                </div>
                <div className="conatiner-button">
                    <button className="btn btn-dark" onClick={verificarVacio}>
                        Buscar
                    </button>
                </div>
                <div className="titulo-sug">
                    <h5>Productos sugeridos</h5>
                </div>
                <div className="container-suggestions">
                    <span className="sug">Iphone</span><span className="sug">Samsung</span><span className="sug">Oil</span><span className="sug">Laptop</span><span className="sug">Macbook</span>
                </div>
            </div>

        </div>
    )
}

export default Home