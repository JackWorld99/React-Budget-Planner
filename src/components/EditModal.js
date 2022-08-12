import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

export default function EditModal({ show, handleClose, name, max , budgetId }) {
    const nameRef = useRef()
    const maxRef = useRef()

    const { editBudget } = useBudgets()

    function handleSubmit(e){
        e.preventDefault()
        editBudget({
            id: budgetId,
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder={name} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxRef} type="number" min={0} step={1} placeholder={max} required/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit"><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}