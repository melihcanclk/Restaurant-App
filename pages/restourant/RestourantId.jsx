import useLoader from "../../hooks/useLoader";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import send from '../../functions/sendRequest';
import { useEffect } from "react";

export default function RestaurantId() {
    const { id } = useParams()

    const [restaurant, setRestaurant] = useLoader(`/api/burgers/${id}`)

    const styles = {
        innerIcon: {
            marginLeft: '10px'
        }
    }


    const handleVisit = () => {
        send(`/api/burgers/${id}`, {
            visited: !restaurant.visited
        }, 'PATCH')
            .then((data) => {
                if (data.ok) {
                    setRestaurant({
                        ...restaurant,
                        visited: !restaurant.visited
                    })
                }
            })
            .catch((err) => console.log(err));

    }

    useEffect(() => {
        console.log(restaurant)
    }, [restaurant])


    return (
        <Container>
            {
                restaurant.length != 0 ? (
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <h1>{restaurant.name}
                            </h1>
                            {
                                <div style={styles.innerIcon}>
                                    <button onClick={handleVisit} className="ui button">
                                        <i style={{ margin: 0 }} className={
                                            restaurant.visited ? "check circle icon" : "circle icon"
                                        } />
                                    </button>
                                </div>

                            }
                        </div>
                        <h3>Description</h3>
                        <p>{restaurant.description}</p>
                        <div>
                            <h3>Location</h3>
                            <h4>Address</h4>
                            <p>{restaurant.location?.address}</p>
                            <h3>Zipcode</h3>
                            <p>{restaurant.location?.zipcode}</p>
                        </div>
                        <h3>Website</h3>
                        {restaurant.location?.web ? (
                            <a href={restaurant.location?.web}>{restaurant.location?.web}</a>
                        ) : (
                            <p>No website</p>
                        )}
                    </div>
                ) : (
                    <div>
                        <h1>Restaurant not found</h1>
                    </div>
                )
            }
        </Container>
    )
}