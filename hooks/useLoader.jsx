import { useState, useEffect } from 'react';

const useLoader = (requestUrl) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080' + requestUrl)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });
    }, []);

    return data
}

export default useLoader