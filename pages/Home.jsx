import React, { useContext } from 'react'
import Container from '../components/Container'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <h1>Home</h1>
            <button onClick={() => navigate('/restaurants')} className="ui button">Go to restaurants</button>
        </Container>
    )
}

export default Home