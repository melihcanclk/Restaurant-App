import React from 'react'
import { Modal, Grid } from 'semantic-ui-react'
import send from '../functions/sendRequest';


const RestaurantAddModal = ({ setRestaurants }) => {
    const [modalState, setModalState] = React.useState(false);

    const formRef = React.useRef({
        name: '',
        description: '',
        location: {
            address: '',
            zipcode: '',
            web: '',
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(formRef.current).forEach((key) => {
            if (key !== 'location') {
                formRef.current[key] = formRef.current[key].value;
            } else {
                Object.keys(formRef.current.location).forEach((locationKey) => {
                    formRef.current.location[locationKey] = formRef.current.location[locationKey].value;
                })
            }
        })

        send('/api/burgers', formRef.current, 'POST')
            .then((data) => {
                if (data.ok) {
                    send('/api/burgers', {}, 'GET')
                        .then((res) => res.json())
                        .then((data) => setRestaurants(data.data))
                        .catch((err) => console.log(err));
                }

                setModalState(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <div style={{
                marginBottom: '20px',
            }}>
                <button className='ui violet button' onClick={() => setModalState(true)}>Add Restaurant</button>
            </div>

            <Modal
                onClose={() => setModalState(false)}
                onOpen={() => setModalState(true)}
                open={modalState}
            >
                <Modal.Header>Add Restaurant</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                {
                                    // label and inputs will be in a grid
                                }
                                <Grid columns={2} padded>
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            <label htmlFor="name">Name</label>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <input ref={(element) => { formRef.current["name"] = element }} className="form-control" type="text" name="name" id="name" />
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <label htmlFor="description">Description</label>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <input ref={(element) => { formRef.current["description"] = element }} className="form-control" type="text" name="description" id="description" />
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <label htmlFor="address">Address</label>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <input ref={(element) => { formRef.current.location["address"] = element }} className="form-control" type="text" name="address" id="address" />
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <label htmlFor="zipcode">Zipcode</label>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <input ref={(element) => { formRef.current.location["zipcode"] = element }} className="form-control" type="text" name="zipcode" id="zipcode" />
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <label htmlFor="web">Website</label>
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <input ref={(element) => { formRef.current.location["web"] = element }} className="form-control" type="text" name="web" id="web" />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <div className="ui buttons">
                                    <button onClick={() => setModalState(false)} className="ui button">Cancel</button>
                                    <div className="or"></div>
                                    <button className="ui positive button active" onClick={handleSubmit} type='button' >Add Restaurant</button>
                                </div>
                            </div>
                        </form>

                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div>
    )
}

export default RestaurantAddModal