import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

const ProductTile = ({product, classes}) => {
    const cartCtx = useContext(CartContext);

    const addTileItemHandler = (event) => {
        event.preventDefault();
        cartCtx.addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
        });
    };

    return (
        <div className={classes}>
        <div className="product-item bg-light mb-4">
            <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={product.thumbnail} alt="" />
                <div className="product-action">
                    <Link className="btn btn-outline-dark btn-square" to="#" onClick={addTileItemHandler}><i className="fa fa-shopping-cart"></i></Link>
                    <Link className="btn btn-outline-dark btn-square" to="/temp"><i className="far fa-heart"></i></Link>
                    <Link className="btn btn-outline-dark btn-square" to="/temp"><i className="fa fa-sync-alt"></i></Link>
                    <Link className="btn btn-outline-dark btn-square" to="/temp"><i className="fa fa-search"></i></Link>
                </div>
            </div>
            <div className="text-center py-4">
                <Link className="h6 text-decoration-none text-truncate" to={`/products/${product.id}`}>{product.title}</Link>
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${product.price.toFixed(2)}</h5><h6 className="text-muted ml-2"><del>${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</del></h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small>(99)</small>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ProductTile;