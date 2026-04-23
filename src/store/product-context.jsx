import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext({
    getCategories: () => {},
    getProductsByCategory: (category) => {},
    getFeaturedProducts: () => {},
    getProduct: (productId) => {},
    isLoading: false,
    loadError: null,
});

export const ProductContextProvider = (props) => {

    // State variable to hold product data
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {

        // Function to retrieve  products data from API
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setLoadError(null);

                const result = await axios.get('https://dummyjson.com/products?limit=100');
                const retrievedProducts = result.data.products;

                // Sort products by category for later use
                retrievedProducts.sort((productA, productB) => {
                    if (productA.category < productB.category)
                        return -1;
                    else if (productB.category < productA.category)
                        return 1;
                    else
                        return 0;
                });
                
                // Set the state variable to the products retrieved
                setProducts(retrievedProducts);

                sessionStorage.setItem('products', JSON.stringify(retrievedProducts));
                console.log("Data retrieved from API");
            } catch (error) {
                setLoadError(error.message || "Failed to load products.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [])

    // Function that retrieves one item per category along with a count of items in that category
    const getCategories = useCallback(() => {
        const categoriesMap = new Map();

        products.forEach((product) => {
            if (!categoriesMap.has(product.category)) {
                categoriesMap.set(product.category, {
                    category: product.category,
                    thumbnail: product.thumbnail,
                    id: product.id,
                    numProducts: 1,
                });
                return;
            }

            const existingCategory = categoriesMap.get(product.category);
            existingCategory.numProducts += 1;
        });

        return Array.from(categoriesMap.values()).sort((a, b) =>
            a.category.localeCompare(b.category)
        );
    }, [products]);

    // Function that retrieves products within a given category
    const getProductsByCategory = useCallback((category) => {
        return products.filter(product => product.category === category);
    }, [products]);

    // Function that receives a specified number of random products
    const getFeaturedProducts = useCallback((numProducts) => {

        //Create a copy of the products array and sort in random order
        const shuffled = [...products].sort(() => 0.5 - Math.random());

        //Grab the first n elements of the shuffled array
        return shuffled.slice(0, numProducts);
    }, [products]);

    // Function that retrieves a product by ID
    const getProduct = useCallback((productId) => {
        const product = products.find(product => product.id === parseInt(productId));
        return product;
    }, [products]);

    const contextValue = useMemo(() => ({
        getCategories,
        getProductsByCategory,
        getFeaturedProducts,
        getProduct,
        isLoading,
        loadError,
    }), [getCategories, getProductsByCategory, getFeaturedProducts, getProduct, isLoading, loadError]);

    return (
    <ProductContext.Provider value={{
        ...contextValue
    }}>
        {props.children}
    </ProductContext.Provider>)


}

export default ProductContext;