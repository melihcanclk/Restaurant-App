import React from 'react'
import Container from '../components/Container'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
    const navigate = useNavigate()
    const { isLoading, isAuthenticated, error, user} =
        useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        console.log(user)
        return (
            <Container>
                <h1>Welcome {user.name}</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <button onClick={() => navigate('/restaurants')} className="ui button">Go to restaurants</button>
                </div>
            </Container>
        )
    } else {
        return (
            <Container>
                <h1>Welcome, Please Log In</h1>
            </Container>
        )
    }
}

export default Home