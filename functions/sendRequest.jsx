const send = async (requestUrl, data, method) => {
    if (method === 'GET') {
        console.log('GET')
        return await fetch('http://localhost:8080' + requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } else {
        console.log('else')
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
