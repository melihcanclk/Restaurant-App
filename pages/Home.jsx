import React from 'react'
import Container from '../components/Container'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader } from 'semantic-ui-react'

const Home = () => {
    const navigate = useNavigate()
    const { isLoading, isAuthenticated, error, user } =
        useAuth0();

    return (
        <Container>
            {
                isLoading ? <Loader active inline='centered' /> :
                    error ? <div>Oops... {error.message}</div> :
                        isAuthenticated ? (
                            <>
                                <h1>Welcome {user.name}</h1>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                    <button onClick={() => navigate('/restaurants')} className="ui button">Go to restaurants</button>
                                </div>
                            </>
                        )
                            : (
                                <>
                                    <h1>Welcome to the best restaurant app</h1>
                                    <p>Please Log In</p>
                                </>
                            )
            }
        </Container>
    )
}

export default Home