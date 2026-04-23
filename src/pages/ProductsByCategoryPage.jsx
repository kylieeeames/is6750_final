import { useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import Container from "../components/Layout/Container";
import ProductSidebar from "../components/Products/ProductSidebar";
import ProductsByCategory from "../components/Products/ProductsByCategory";
import ProductContext from "../store/product-context";

const ProductsByCategoryPage = () => {
  const { categoryname } = useParams();
  const productCtx = useContext(ProductContext);
  const normalizedCategory = decodeURIComponent(categoryname ?? "");

  const productsInCategory = useMemo(() => {
    return productCtx.getProductsByCategory(normalizedCategory);
  }, [productCtx.getProductsByCategory, normalizedCategory]);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(
      productsInCategory
        .map((product) => product.brand)
        .filter((brand) => typeof brand === "string" && brand.trim().length > 0)
    );
    return Array.from(uniqueBrands).sort((a, b) => a.localeCompare(b));
  }, [productsInCategory]);

  const brandCounts = useMemo(() => {
    return productsInCategory.reduce((counts, product) => {
      const brand = typeof product.brand === "string" ? product.brand.trim() : "";
      if (!brand) return counts;

      counts[brand] = (counts[brand] || 0) + 1;
      return counts;
    }, {})
  }, [productsInCategory]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    setSelectedBrands((previous) => {
      // First load: default to all brands selected.
      if (previous.length === 0) return brands;

      // Preserve selection across category changes, but ensure at least one selected.
      const preservedSelection = previous.filter((brand) => brands.includes(brand));
      return preservedSelection.length > 0 ? preservedSelection : brands;
    });
  }, [brands]);

  const allBrandsSelected =
    brands.length > 0 && brands.every((brand) => selectedBrands.includes(brand));

  const filteredProducts = useMemo(() => {
    if (brands.length === 0) return productsInCategory;
    return productsInCategory.filter((product) => selectedBrands.includes(product.brand));
  }, [productsInCategory, selectedBrands]);

  const handleToggleAllBrands = (isChecked) => {
    setSelectedBrands(isChecked ? brands : []);
  };

  const handleToggleBrand = (brand, isChecked) => {
    if (isChecked) {
      setSelectedBrands((previous) =>
        previous.includes(brand) ? previous : [...previous, brand]
      );
    } else {
      setSelectedBrands((previous) => previous.filter((item) => item !== brand));
    }
  };

  if (productCtx.isLoading) {
    return (
      <Container classNames="container-fluid">
        <Container classNames="row px-xl-5">
          <div className="col-12">
            <div className="bg-light p-30">Loading products...</div>
          </div>
        </Container>
      </Container>
    );
  }

  if (productCtx.loadError) {
    return (
      <Container classNames="container-fluid">
        <Container classNames="row px-xl-5">
          <div className="col-12">
            <div className="bg-light p-30">Unable to load products. {productCtx.loadError}</div>
          </div>
        </Container>
      </Container>
    );
  }

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
        <ProductsByCategory category={normalizedCategory} products={filteredProducts} />
      </Container>
    </Container>
  );
};

export default ProductsByCategoryPage;