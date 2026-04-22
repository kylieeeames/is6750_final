import { useContext } from "react";
import ProductList from "./ProductList";

import ProductContext from "../../store/product-context";

const FeaturedProducts = () => {
  
  // Retrieve featured products from context
  const prodCtx = useContext(ProductContext);
  const featuredProducts = prodCtx.getFeaturedProducts(8);

  if (featuredProducts)
    return (
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <ProductList
          products={featuredProducts}
          classes="row px-xl-5"
          tileClasses="col-lg-3 col-md-4 col-sm-6 pb-1"
        />
      </div>
    );
};

export default FeaturedProducts;
