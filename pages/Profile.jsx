import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Container from '../components/Container'
import { Grid } from 'semantic-ui-react'

const Profile = () => {

    const { user } = useAuth0()

    return (
        <Container>
            <div style={{
                width: '80%',
                height: '80%',
            }}>
                <h1>Profile</h1>

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {
                                // user image
                                user && user.picture && <img width={"80%"} src={user.picture} alt={user.name} />
                            }
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div style={{
                                // align left
                                textAlign: 'left',
                                height: '100%',
                                position: 'absolute',
                                top: '35%',
                            }}>
                                <h3>Nickname : {user && user.nickname}</h3>

                                <h3>Username : {user && user.name}</h3>
                                <h3>Email : {user && user.email}</h3>
                            </div>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>



        </Container>
    )
}

export default Profile