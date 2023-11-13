import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Detail.css";
import { Carousel } from "react-responsive-carousel";
import Swal from "sweetalert2";
const Detail = () => {

    const [query, setQuery] = useState("");
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }
    const showSwal = () => {
        new Swal({
            title: "¡Producto agregado!",
            text: "El producto se agregó al carrito de compras",
            icon: "success",
            button: "Aceptar",
        });
    }

    const renderRatingBar = (rating) => {
        return (
            <div className="rating-bar">
                <div className="bar-inner" style={{ width: `${(rating / 5) * 100}%` }}></div>
            </div>
        );
    }

    useEffect(() => {
        const findProducts = async () => {
            try {
                const response = await fetch(`/api/ProductoDet/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };
        findProducts();
    }, [id]);

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
            </div>
            <div className="row escritorio bg-bg">
                <div className="col-6">
                    {/* Slider con las imágenes del producto */}
                    {product && product.Imagen && product.Imagen.length > 0 && (
                        <Carousel>
                            {product.Imagen.map((imagen, index) => (
                                <div key={index}>
                                    <img className="imgSlider" src={imagen.url} alt={`Imagen ${index + 1}`} />
                                </div>
                            ))}
                        </Carousel>
                    )}
                </div>
                <div className="col-6">
                    <h1>{product.Title}</h1>
                    <p className="price">${product.Price}</p>
                    <p><b>Descripción:</b> {product.Descripcion}</p>
                    <p><b>Descuento:</b> {product.discountPercentage}%</p>
                    <p><b>Calificación:</b> {product.rating}</p>
                    <p className="barraCal">{renderRatingBar(product.rating)}</p>
                    <p><b>Stock:</b> {product.stock}</p>
                    <p><b>Marca:</b> {product.brand}</p>
                    <p><b>Categoría:</b> {product.category}</p>
                    {/* Agrega otros detalles según tu estructura de datos */}
                    <br></br>
                    <button className="btn btn-success lg" onClick={showSwal}>Comprar</button>
                </div>
            </div>
            <div className="row movil bg-bg">
                <div className="col-12">
                    {/* Slider con las imágenes del producto */}
                    {product && product.Imagen && product.Imagen.length > 0 && (
                        <Carousel>
                            {product.Imagen.map((imagen, index) => (
                                <div key={index}>
                                    <img className="imgSlider" src={imagen.url} alt={`Imagen ${index + 1}`} />
                                </div>
                            ))}
                        </Carousel>
                    )}
                </div>
                <div className="col-12 atributos">
                    <h1>{product.Title}</h1>
                    <p className="price">${product.Price}</p>
                    <p><b>Descripción:</b> {product.Descripcion}</p>
                    <p><b>Descuento:</b> {product.discountPercentage}%</p>
                    <p><b>Calificación:</b> {product.rating}</p>
                    <p className="barraCal">{renderRatingBar(product.rating)}</p>
                    <p><b>Stock:</b> {product.stock}</p>
                    <p><b>Marca:</b> {product.brand}</p>
                    <p><b>Categoría:</b> {product.category}</p>
                    <button className="btn btn-success lg" onClick={showSwal}>Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;