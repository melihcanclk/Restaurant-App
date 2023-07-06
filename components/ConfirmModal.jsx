import React from 'react'
import { Modal } from 'semantic-ui-react'
import send from '../functions/sendRequest';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ confirmModalState, setConfirmModalState, id }) => {

    const navigate = useNavigate();

    const handleDelete = () => {
        send(`/api/burgers/${id}`, {}, 'DELETE')
            .then((data) => {
                if (data.ok) {
                    // move to home page
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <Modal
                onClose={() => setConfirmModalState(false)}
                onOpen={() => setConfirmModalState(true)}
                open={confirmModalState}
                size='mini'
            >
                {// make confirmation for if user want to delete the restaurant
                }
                <Modal.Header>Are you sure you want to delete this restaurant?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            This action cannot be undone.
                        </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <button onClick={() => setConfirmModalState(false)} className="ui button">Cancel</button>
                    <button onClick={handleDelete} className="ui red button">Delete</button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}

export default ConfirmModal