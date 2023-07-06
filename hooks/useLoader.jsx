import { useState, useEffect } from 'react';
import send from '../functions/sendRequest';

const useLoader = (requestUrl) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        send(requestUrl, {}, 'GET')
            .then((res) => res.json())
            .then((data) => setData(data.data))
            .catch((err) => console.log(err));
    }, []);

    return data
}

export default useLoader