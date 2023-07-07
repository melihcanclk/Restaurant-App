import { useState, useEffect } from 'react';
import send from '../functions/sendRequest';
import { useAuth0 } from '@auth0/auth0-react'

const useLoader = (requestUrl) => {
    const [data, setData] = useState([]);
    const [isFound, setIsFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth0()


    useEffect(() => {
        const sub = user && user.sub
        if (sub) {
            send(requestUrl, {}, 'GET', sub)
                .then((data) => {
                    if (data.ok) {
                        setIsFound(true)
                        return data.json()
                    } else {
                        setIsFound(false)
                    }
                })
                .then((data) => {
                    setData(data.data)
                    setIsLoading(false)
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return [data, isFound, isLoading, setData]
}

export default useLoader