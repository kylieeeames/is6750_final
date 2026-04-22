import ProductList from "./ProductList";
import formatCategory from "../../utils/formatCategory";

const ProductsByCategory = ({ category, products }) => {

    return (
      <div className="col-lg-9 col-md-8">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">{formatCategory(category)}</span>
        </h2>
        <ProductList
          products={products}
          classes="row px-xl-5"
          tileClasses="col-lg-3 col-md-4 col-sm-6 pb-1"
        />
      </div>
    );
};

export default ProductsByCategory;
