import { useState, useEffect } from "react";
import axios from 'axios';

//Define custom hook
const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Want the component to be mounted, and not try to apply something after it is unmounted.
            // Would cause a memory-leak
        let isMounted = true;
        const source = axios.CancelToken.source(); // define cancellation token, provided by axios

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    // Apply the cancel token, canecl the request if we unmount the component.
                    cancelToken: source.token
                });

                //Check if component is mounted
                if (isMounted) {
                    setData(response.data); // Axios automatically parses data to json format
                    setFetchError(null);
                }
            } catch (error) {
                if (isMounted) {
                    setFetchError(error.message);
                    setData([]);
                }
            } finally {
                if(isMounted && setIsLoading(false)); // if isMounted is true, opposed to check if null
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log('clean up function')
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl])

    return {data, fetchError, isLoading}
}

export default useAxiosFetch;