 import React, {useContext} from 'react';
import ProductContext from '../../store/product-context';
import formatCategory from '../../utils/formatCategory';
import { Link } from 'react-router-dom';

const CategoryMenu = () => {

    // Retrieve category info from context
    const prodCtx = useContext(ProductContext);
    const categories = prodCtx.getCategories();
   
   // Make sure categories exist before rendering
    if (categories.length > 0)
    return ( 
        <div className="col-lg-3 d-none d-lg-block">
        <a className={`btn d-flex align-items-center justify-content-between bg-primary w-100`} data-toggle="collapse" data-target="#navbar-vertical" href="#navbar-vertical" style={{height: '65px', padding: '0 30 px'}} >
            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
            <i className="fa fa-angle-down text-dark"></i>
        </a>
        <nav  className={`collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light`} id="navbar-vertical" style={{width: `calc(100% - 30px)`, zIndex: 999}}>
        <div className="navbar-nav w-100">
                <div className="nav-item dropdown dropright">
                    
                </div> 
                {categories.map((item) => {
                    return  <Link to={`/products/category/${item.category}`} key={item.id} className="nav-item nav-link">{formatCategory(item.category)}</Link>
                })}
               
            </div>
        </nav>
    </div>
    );
}

export default React.memo(CategoryMenu);