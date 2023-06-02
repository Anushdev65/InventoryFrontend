import { useState, useEffect } from "react";
import axios from 'axios'


function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(url)
                setData(data);
                setLoding(false);
            } catch (error) {
                setError(error);
                setLoding(false);
            }
        })();
    }, []);

    return { data, setData, loading, error };

}

export { useFetch };