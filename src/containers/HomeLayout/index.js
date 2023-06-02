import "./homelayout.css";
import ProductCard from "../../components/ProductCard";
// import { useState, useEffect } from "react";
// import axios from 'axios'
import { Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { useFetch } from "../../hooks";
import axios from 'axios'



function HomeLayout() {
    const { data: products, setData: setProducts, loading, error } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/products`)



    const handleDeleteProduct = async (productId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`);
            setProducts(products.filter((element) =>
                element._id !== data.data._id))
            console.log('Product deleted successfully');
        } catch (error) {
            console.log('Error deleting product:', error);
        };
    };


    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await axios.get(
    //                 'http://localhost:5000/products');
    //             console.log(data);
    //             setProducts(data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(true);
    //             setLoading(false);
    //         }
    //     })();
    // }, []);

    return (
        <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            gap={2}
            mt={10}
            mb={10}
        >
            {loading && (
                <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={210}
                    height={118}
                />
            )}
            {!loading && error && <p> Error</p>}

            {!loading &&
                !error &&
                products &&
                products.map((product) => {
                    return (<ProductCard product={product} key={product._id}
                        onDeleteProduct={handleDeleteProduct}
                    />)
                })}

        </Box>
    )
}

export default HomeLayout;