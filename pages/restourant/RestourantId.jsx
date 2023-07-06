import useLoader from "../../hooks/useLoader";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import send from '../../functions/sendRequest';
import ConfirmModal from "../../components/ConfirmModal";
import React from 'react'
import EditModal from "../../components/EditModal";
import { Loader } from "semantic-ui-react";

export default function RestaurantId() {
    const { id } = useParams()

    const [confirmModalState, setConfirmModalState] = React.useState(false);
    const [editModalState, setEditModalState] = React.useState(false);

    const [restaurant, isFound, isLoading, setRestaurant] = useLoader(`/api/burgers/${id}`)

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

    return (
        <Container>
            {
                isLoading ? <Loader active inline='centered' /> :
                    !isFound ? <h1>Restaurant not found</h1> :
                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <h1>{restaurant.name}
                                </h1>

                                <div style={styles.innerIcon}>
                                    <button onClick={() => setEditModalState(true)} className="ui icon button">
                                        <i className="pencil alternate icon"></i>
                                    </button>
                                    <button onClick={() => setConfirmModalState(true)} className="ui icon button">
                                        <i className="red trash icon"></i>
                                    </button>
                                    <button onClick={handleVisit} className="ui icon button">
                                        <i style={{ margin: 0 }} className={
                                            restaurant.visited ? "green circle icon" : "circle icon"
                                        } />
                                    </button>
                                </div>
                                <EditModal setEditModalState={setEditModalState} editModalState={editModalState} id={id} setRestaurant={setRestaurant} />
                                <ConfirmModal setConfirmModalState={setConfirmModalState} confirmModalState={confirmModalState} id={id} />
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
                                <a href={restaurant.location?.web} target="_blank">{restaurant.location?.web}</a>
                            ) : (
                                <p>No website</p>
                            )}
                        </div>
            }
        </Container>
    )
}