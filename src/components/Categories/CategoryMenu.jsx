import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductContext from '../../store/product-context';
import formatCategory from '../../utils/formatCategory';
import { Link, useLocation } from 'react-router-dom';

const CategoryMenu = () => {

    // Retrieve category info from context
    const prodCtx = useContext(ProductContext);
    const categories = prodCtx.getCategories();
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event) => {
            const root = rootRef.current;
            if (!root) return;
            if (root.contains(event.target)) return;
            setIsOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isOpen]);
   
   // Make sure categories exist before rendering
    const isDisabled = prodCtx.isLoading || !!prodCtx.loadError || categories.length === 0;

    return ( 
        <div className="col-lg-3 d-none d-lg-block" ref={rootRef} style={{ position: 'relative' }}>
        <button
            type="button"
            className="btn d-flex align-items-center justify-content-between bg-primary w-100"
            onClick={() => {
              if (isDisabled) return;
              setIsOpen((previous) => !previous);
            }}
            style={{ height: '65px', padding: '0 30px' }}
            aria-expanded={isOpen}
            aria-controls="navbar-vertical"
            disabled={isDisabled}
        >
            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
            <i className="fa fa-angle-down text-dark"></i>
        </button>
        {isOpen ? (
            <nav
                className="navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                id="navbar-vertical"
                style={{
                    width: `calc(100% - 30px)`,
                    position: 'absolute',
                    top: '65px',
                    left: 0,
                    zIndex: 1030,
                    maxHeight: '70vh',
                    overflowY: 'auto',
                }}
            >
                <div className="navbar-nav w-100">
                    {categories.map((item) => {
                        return  <Link to={`/products/category/${encodeURIComponent(item.category)}`} key={item.id} className="nav-item nav-link" onClick={() => setIsOpen(false)}>{formatCategory(item.category)}</Link>
                    })}
                </div>
            </nav>
        ) : null}
    </div>
    );
}

export default React.memo(CategoryMenu);