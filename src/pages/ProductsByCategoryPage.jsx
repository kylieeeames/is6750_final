import { useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import Container from "../components/Layout/Container";
import ProductSidebar from "../components/Products/ProductSidebar";
import ProductsByCategory from "../components/Products/ProductsByCategory";
import ProductContext from "../store/product-context";

const ProductsByCategoryPage = () => {
  const { categoryname } = useParams();
  const productCtx = useContext(ProductContext);

  const productsInCategory = productCtx.getProductsByCategory(categoryname);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(productsInCategory.map((product) => product.brand));
    return Array.from(uniqueBrands).sort();
  }, [productsInCategory]);

  const brandCounts = useMemo(() => {
    return productsInCategory.reduce((counts, product) => {
      counts[product.brand] = (counts[product.brand] || 0) + 1;
      return counts;
    }, {})
  }, [productsInCategory]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    setSelectedBrands(brands);
  }, [brands]);

  const allBrandsSelected = brands.length > 0 && selectedBrands.length === brands.length;

  const filteredProducts = useMemo(() => {
    return productsInCategory.filter((product) => selectedBrands.includes(product.brand));
  }, [productsInCategory, selectedBrands]);

  const handleToggleAllBrands = (isChecked) => {
    setSelectedBrands(isChecked ? brands : []);
  };

  const handleToggleBrand = (brand, isChecked) => {
    if (isChecked) {
      setSelectedBrands((previous) => [...previous, brand]);
    } else {
      setSelectedBrands((previous) => previous.filter((item) => item !== brand));
    }
  };

  return (
    <Container classNames="container-fluid">
      <Container classNames="row px-xl-5">
        <ProductSidebar
          brands={brands}
          brandCounts={brandCounts}
          selectedBrands={selectedBrands}
          allBrandsSelected={allBrandsSelected}
          totalProducts={productsInCategory.length}
          onToggleAllBrands={handleToggleAllBrands}
          onToggleBrand={handleToggleBrand}
        />
        <ProductsByCategory category={categoryname} products={filteredProducts} />
      </Container>
    </Container>
  );
};

export default ProductsByCategoryPage;