import { useState, useEffect } from 'react';
import send from '../functions/sendRequest';

const useLoader = (requestUrl) => {
    const [data, setData] = useState([]);
    const [isFound, setIsFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        send(requestUrl, {}, 'GET')
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setData(data.data);
                    setIsFound(true);
                    setIsLoading(false);
                } else {
                    setIsFound(false);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return [data, isFound, isLoading, setData]
}

export default useLoader