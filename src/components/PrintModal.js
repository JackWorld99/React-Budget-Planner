import { Form, Modal, Button } from "react-bootstrap"
import React, { useRef, useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import ReactToPrint from "react-to-print"
import PrintPDF from "./PrintPDF"

export default function PrintModal({ show, handleClose }) {
    const { budgets, getBudgetExpenses } = useBudgets()
    const [title, setTitle] = useState()
    let componentRef = useRef()

    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Print Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="titleRef">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(e) => setTitle(e.target.value)} type="text"/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                         <ReactToPrint trigger={() => <Button onClick={(e) => {e.preventDefault()}} variant="primary"><FontAwesomeIcon icon={faPrint} /></Button>} content={() => componentRef} onAfterPrint={()=>handleClose()} />                   
                         <div style={{ display: "none" }}>
                            <div ref={(el) => (componentRef = el)}>
                                <PrintPDF title={title} budgets={budgets} getBudgetExpenses={getBudgetExpenses} UNCATEGORIZED_BUDGET_ID={UNCATEGORIZED_BUDGET_ID}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

