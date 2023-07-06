import React from 'react'

const RestaurantList = ({ restaurants, setRestaurants }) => {

    const styles = {
        color: 'white',
        maxHeight: '81vh',
        width: '300px',
        // scroll
        overflowY: 'scroll',
        paddingRight: '30px',

        list: {
            padding: '10px',
            margin: '10px',
            border: '3px solid white',
            borderRadius: '5px',
        },

        a: {
            color: 'white',
            textDecoration: 'none',
        },

        ul : {
            listStyleType: 'none',
        }
    }

    return (
        <div style={styles}>
            <ul style={styles.ul} >
                {
                    Object.keys(restaurants).map((key) => (
                        <li key={key}>
                            <a style={styles.a} href={`/restaurant/${key}`}>
                                <div style={styles.list}>
                                    {restaurants[key].name}
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default RestaurantList