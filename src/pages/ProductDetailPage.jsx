import { useParams } from "react-router-dom";
import ProductDetail from "../components/Products/ProductDetail";

const ProductDetailPage = () => {
  const { productid } = useParams();

  return <ProductDetail productID={productid} />;
};

export default ProductDetailPage;