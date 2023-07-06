import React from 'react'

const Container = ({ children }) => {
    // define style
    const style = {
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        height: '98vh',
        color: 'white',
        backgroundColor: '#282c34',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',

        div: {
            margin: '10px',
            height: '95%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

    };
    return (
        <div style={style}>
            <header>
                <h1>Restaurant App</h1>
            </header>
            <div style={style.div} className="container">
                {children}
            </div>
        </div>

    )
}

export default Container