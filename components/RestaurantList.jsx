import React from 'react'

const RestaurantList = ({ restaurants }) => {

    const styles = {
        color: 'white',
        maxHeight: '81vh',
        width: '300px',
        // scroll
        overflowY: 'auto',
        paddingRight: '30px',

        list: {
            margin: '10px',
        },

        a: {
            color: 'white',
            textDecoration: 'none',
        },

        ul: {
            listStyleType: 'none',
        }
    }

    return (
        <div style={styles}>
            <ul style={styles.ul} >
                {
                    restaurants && Object.keys(restaurants).map((key) => (
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