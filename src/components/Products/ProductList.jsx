import ProductTile from "./ProductTile";

const ProductList = ({ products, classes, tileClasses }) => {
  return (
    <div className={classes}>
      {products.map((product) => {
        return (
          <ProductTile key={product.id} product={product} classes={tileClasses} />
        );
      })}
    </div>
  );
};

export default ProductList;
