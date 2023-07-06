import React, { useEffect } from 'react'
import { Modal, Grid } from 'semantic-ui-react'
import send from '../functions/sendRequest';


const EditModal = ({ editModalState, setEditModalState, id, setRestaurant }) => {

    const formRef = React.useRef({
        name: '',
        description: '',
        location: {
            address: '',
            zipcode: '',
            web: '',
        }
    });

    const handleSubmit = () => {
        send(`/api/burgers/${id}`, {
            name: formRef.current.name.value,
            description: formRef.current.description.value,
            location: {
                address: formRef.current.location.address.value,
                zipcode: formRef.current.location.zipcode.value,
                web: formRef.current.location.web.value,

            }
        }, 'PATCH')
            .then((data) => {
                if (data.ok) {
                    setRestaurant({
                        name: formRef.current.name.value,
                        description: formRef.current.description.value,
                        location: {
                            address: formRef.current.location.address.value,
                            zipcode: formRef.current.location.zipcode.value,
                            web: formRef.current.location.web.value,

                        }
                    });
                    setEditModalState(false);
                }
            })
            .catch((err) => console.log(err)
            )
    }


    useEffect(() => {
        // get info from server
        send(`/api/burgers/${id}`, {}, 'GET')
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
            })
            .then((data) => {
                Object.keys(data.data).forEach((key) => {
                    if (key === 'location') {
                        Object.keys(data.data[key]).forEach((locationKey) => {
                            if (formRef.current[key][locationKey]) {
                                formRef.current[key][locationKey].value = data.data[key][locationKey];
                            }
                        })
                    } else {
                        if (formRef.current[key]) {
                            formRef.current[key].value = data.data[key];
                        }
                    }
                })

            })
            .catch((err) => console.log(err));

    }, [editModalState])

    return (
        <div>
            <Modal
                onClose={() => setEditModalState(false)}
                onOpen={() => setEditModalState(true)}
                open={editModalState}
            >
                <Modal.Header>Edit Restaurant</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit} className="ui form" >
                            <div className="form-group">
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
                                    <button type='button' onClick={() => setEditModalState(false)} className="ui button">Cancel</button>
                                    <div className="or"></div>
                                    <input type="submit" className="ui positive button" value="Save" />
                                </div>
                            </div>
                        </form>

                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div>
    )
}

export default EditModal