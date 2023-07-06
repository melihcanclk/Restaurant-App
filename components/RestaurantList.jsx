import React from 'react'

const RestaurantList = ({ restaurants, setRestaurants }) => {

    const styles = {
        color: 'white',
        maxHeight: '81vh',
        width : '300px',
        // scroll
        overflowY: 'scroll',
        paddingRight: '30px',
    }

    const a = {
        color: 'white',
        textDecoration: 'none',
    }

    const ul = {
        listStyleType: 'none',
    }


    return (
        <div style={styles}>
            <ul style={ul} >
                {
                    Object.keys(restaurants).map((key) => (
                        <li key={key}>
                            <a style={a} href={`/restaurant/${key}`}>{restaurants[key].name}</a>
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default RestaurantList