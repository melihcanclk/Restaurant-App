const send = async (requestUrl, data, method, sub) => {
    if (method === 'GET' || method === 'DELETE') {
        return await fetch('http://localhost:8080' + requestUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'sub' : sub
            }
        })
    } else {
        return await fetch('http://localhost:8080' + requestUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'sub' : sub
            },
            body: JSON.stringify(data),
        })
    }

}

export default send;
