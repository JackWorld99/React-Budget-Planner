import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteExpense } = useBudgets()

  const expenses = getBudgetExpenses(budgetId)
  const budget =  budgets.find(b => b.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {((budget?.name.length >= 25) ? budget?.name.substring(0, 25) + "..." : budget?.name) ?? "Uncategorized"}</div>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">{expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description.length >= 25 ? expense.description.substring(0,25) + "..." : expense.description}</div>
              <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
              <Button onClick={() => deleteExpense(expense)} size="sm" variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
