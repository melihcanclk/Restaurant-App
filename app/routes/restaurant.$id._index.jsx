import { useParams } from "react-router-dom";
import useLoader from "../../hooks/useLoader";

export default function RestaurantId() {
    const { id } = useParams();

    const restaurant = useLoader(`/api/burgers/${id}`)

    return (
        restaurant ? (
            <div>
                <h1>{restaurant.name}</h1>
                <p>{restaurant.description}</p>
                <div>
                    <p>{restaurant.location?.address}</p>
                    <p>{restaurant.location?.zipcode}</p>
                </div>
                <a href={restaurant.location?.web}></a>
            </div>
        ) : (
            <div>
                <h1>Restaurant not found</h1>
            </div>
        )
    )

}