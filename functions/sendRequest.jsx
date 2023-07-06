const send = async (requestUrl, data, method) => {
    if (method === 'GET' || method === 'DELETE') {
        return await fetch('http://localhost:8080' + requestUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } else {
        return await fetch('http://localhost:8080' + requestUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

}

export default send;
