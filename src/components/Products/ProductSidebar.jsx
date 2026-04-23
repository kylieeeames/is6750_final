const ProductSidebar = ({
  brands,
  brandCounts,
  selectedBrands,
  allBrandsSelected,
  totalProducts,
  onToggleAllBrands,
  onToggleBrand,
}) => {
    
  return (
    <div className="col-lg-3 col-md-4">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by brand</span>
      </h5>

      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="brand-all"
              checked={allBrandsSelected}
              onChange={(event) => onToggleAllBrands(event.target.checked)}
            />
            <label className="custom-control-label" htmlFor="brand-all">
              All Brands
            </label>
            <span className="badge border font-weight-normal">{totalProducts}</span>
          </div>

          {brands.map((brand) => {
            if (typeof brand !== "string" || brand.trim().length === 0) return null;

            const normalizedBrand = brand.trim();
            const brandId = `brand-${normalizedBrand.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <div
                key={normalizedBrand}
                className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
              >
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={brandId}
                  checked={selectedBrands.includes(normalizedBrand)}
                  onChange={(event) => onToggleBrand(normalizedBrand, event.target.checked)}
                />
                <label className="custom-control-label" htmlFor={brandId}>
                  {normalizedBrand}
                </label>
                <span className="badge border font-weight-normal">
                  {brandCounts[normalizedBrand] ?? 0}
                </span>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default ProductSidebar;