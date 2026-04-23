import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../store/cart-context";

const ProductTile = ({product, classes}) => {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/products/${product.id}`);
    };

    const addTileItemHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        cartCtx.addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
        });
    };

    const ignoreTileClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className={classes}>
        <div className="product-item bg-light mb-4">
            <div className="product-img position-relative overflow-hidden" role="link" tabIndex={0} onClick={goToDetail} onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToDetail();
            }}>
                <img className="img-fluid w-100" src={product.thumbnail} alt="" />
                <div className="product-action">
                    <Link className="btn btn-outline-dark btn-square" to="/cart" onClick={addTileItemHandler} aria-label="Add to cart"><i className="fa fa-shopping-cart"></i></Link>
                    <button type="button" className="btn btn-outline-dark btn-square" onClick={ignoreTileClick} aria-label="Wishlist (coming soon)"><i className="far fa-heart"></i></button>
                    <button type="button" className="btn btn-outline-dark btn-square" onClick={ignoreTileClick} aria-label="Compare (coming soon)"><i className="fa fa-sync-alt"></i></button>
                    <Link className="btn btn-outline-dark btn-square" to={`/products/${product.id}`} onClick={(e) => e.stopPropagation()} aria-label="View details"><i className="fa fa-search"></i></Link>
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