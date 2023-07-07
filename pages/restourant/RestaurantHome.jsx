import React from 'react'
import useLoader from '../../hooks/useLoader'
import Container from '../../components/Container'
import RestaurantList from '../../components/RestaurantList'
import RestaurantAddModal from '../../components/RestaurantAddModal'


const RestaurantHome = () => {

    const [restaurants, isFound, isLoading, setRestaurants] = useLoader('/api/burgers');
    return (
        <Container>
            <div className="row">
                <div className="col-md-6">
                    <h2>Restaurants</h2>
                     <RestaurantAddModal setRestaurants={setRestaurants} />
                    <RestaurantList restaurants={restaurants} />
                </div>
            </div>
        </Container>
    )
}

export default RestaurantHome