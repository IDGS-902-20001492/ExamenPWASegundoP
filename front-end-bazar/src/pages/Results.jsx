import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './Results.css';

const Results = () => {

    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    //Hacemos un fetch a la API de localhost:44322/api/Productos
    const { title } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const findProducts = async () => {
            try {
                const response = await fetch(`/api/Producto/${title}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        findProducts();
    }, [title]);

    const renderRatingBar = (rating) => {
        return (
            <div className="rating-bar">
                <div className="bar-inner" style={{ width: `${(rating / 5) * 100}%` }}></div>
            </div>
        );
    }

    return (
        <div>
            <div className="row header-container">
                <div className="col-2 carrito">
                    <Link to="/" className="link-button">
                        <p className="icono">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H69.5c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H199.7c-11.5 0-21.4-8.2-23.6-19.5L170.7 288H459.2c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32H360V134.1l23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23V32H120.1C111 12.8 91.6 0 69.5 0H24zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" /></svg>
                        </p>
                    </Link>
                </div>
                <div className="col-9">
                    <div className="container-busqueda-resultado">
                        <input className="input-busqueda" type="text" placeholder="Buscar producto"
                            onKeyUp={handleSearch}
                        />
                    </div>
                </div>
                <div className="col-1">
                    <br></br>
                    <Link to={`/result/${query}`} className="btnresult">
                        <button className="btn btn-dark">
                            Buscar
                        </button>
                    </Link>
                </div>
                <div className="resultados-busqueda">
                    <b>Resultados de la búsqueda:</b> {title}
                </div>
            </div>
            <div className="results-container justify-content-center">
                {Array.isArray(products) && products.map((product) => (
                    <div key={product.Id} className="product-card">
                        <Link to={`/detail/${product.Id}`} className="link-b">
                            <div className="row justify-content-center producto-click" >
                                <div className="col-6">
                                    <img src={product.thumbnail} alt={product.Title} className="img" />
                                </div>
                                <div className="col-6">
                                    <h3 className="product-title">{product.Title}</h3>
                                    <p className="product-description">{product.Descripcion}</p>
                                    <p><b>Categoría:</b>{product.category}</p>
                                    <b>Precio: </b><p className="product-price">${product.Price} USD</p>
                                    <b>Stock:</b><p className="product-stock">{product.stock} Unidades</p>
                                    <b>Calificación:</b><p className="product-rating">{renderRatingBar(product.rating)}{product.rating}/5</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Results