import { useState } from 'react';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//REACT-BOOTSTRAP
import { Modal, Button as Buttons } from 'react-bootstrap';

interface ReadDiaryProp {
    title: string;
    notes: string;
}

function ReadDiary({ title, notes }: ReadDiaryProp) {
    const screen700 = useMediaQuery('(max-width:700px)');

    const [ modalShow, setModalShow ] = useState(false);

    return (
        <span id="read">
            <Button disableRipple onClick={() => setModalShow(true)} style={{ width: "7rem" }} size={screen700 ? "small" : "medium"}>
                READ
            </Button>

            <Modal
                size="sm"
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="modal_title">
                        {title}
                    </Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                    <p className="modal_notes"> {notes} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Buttons onClick={() => setModalShow(false)}>
                        Close
                    </Buttons>
                </Modal.Footer>
            </Modal>
        </span>
    )
}

export default ReadDiary;