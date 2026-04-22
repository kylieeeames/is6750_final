import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

const ProductContext = createContext({
    getCategories: () => {},
    getProductsByCategory: (category) => {},
    getFeaturedProducts: () => {},
    getProduct: (productId) => {}
});

export const ProductContextProvider = (props) => {

    // State variable to hold product data
    const [products, setProducts] = useState([]);

    useEffect(() => {

        // Function to retrieve  products data from API
        const fetchProducts = async () => {
            const result = await axios.get('https://dummyjson.com/products?limit=100');
            const retrievedProducts = result.data.products;

            // Sort products by category for later use
            retrievedProducts.sort((productA, productB) => {
                if (productA.category < productB.category)
                    return -1;
                else if (productB.category < productA.cateogry)
                    return 1;
                else
                    return 0;
            });
            
            // Set the state variable to the products retrieved
            setProducts(retrievedProducts);

            sessionStorage.setItem('products', JSON.stringify(retrievedProducts));
            console.log("Data retrieved from API");
        }

        // Try to get products from session storage first
        let storedProducts = sessionStorage.getItem('products');
        if (storedProducts !== null) {
            setProducts(JSON.parse(storedProducts));
            console.log("Data retrieved from sessionstorage");
        } else {
            fetchProducts(); 
        }
    }, [])

    // Function that retrieves one item per category along with a count of items in that category
    const getCategories = () => {

        let extractedCategories = [];
        let currentCategory="";
    
        products.forEach(product => {
            if (product.category !== currentCategory) {
                extractedCategories.push({category: product.category, thumbnail: product.thumbnail, id: product.id, numProducts: 1});
                currentCategory = product.category;
            } else {
                extractedCategories[extractedCategories.length-1].numProducts++;
            }
        } );

        return extractedCategories;
    }

    // Function that retrieves products within a given category
    const getProductsByCategory = (category) => {
        const productsInCategory = products.filter(product => product.category === category);
        return productsInCategory;
    }

    // Function that receives a specified number of random products
    const getFeaturedProducts = (numProducts) => {

        //Create a copy of the products array and sort in random order
        const shuffled = [...products].sort(() => 0.5 - Math.random());

        //Grab the first n elements of the shuffled array
        return shuffled.slice(0, numProducts);
    }

    // Function that retrieves a product by ID
    const getProduct = (productId) => {
        const product = products.find(product => product.id === parseInt(productId));
        return product;
    }


    return (
    <ProductContext.Provider value={{
        getCategories,
        getProductsByCategory,
        getFeaturedProducts,
        getProduct
    }}>
        {props.children}
    </ProductContext.Provider>)


}

export default ProductContext;