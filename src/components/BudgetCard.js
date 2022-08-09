import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function BudgetCard({name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick, budgetId}) {
  const { budgets, deleteBudget, deleteExpense, getBudgetExpenses} = useBudgets()
  const expenses = getBudgetExpenses(budgetId)
  const budget = budgets.find(b => b.id === budgetId)

  const classNames = [];

  if(amount > max){
    classNames.push("bg-danger","bg-opacity-10")
  }else if(gray){
    classNames.push("bg-light")
  } 

  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                <div className="me-2">{name.length >= 15 ? name.substring(0, 15) + "..." : name}</div>
                <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)} { max && <span className="text-muted fs-6 ms-1"> / {currencyFormatter.format(max)}</span>}</div>
            </Card.Title>
            {max && <ProgressBar className="rounded-pill" variant={getProgressbarVariant(amount,max)} min={0} max={max} now={amount}/>}
            {!hideButtons && (<Stack direction="horizontal" gap="2" className="mt-4">
                <Button variant="primary" className="justify-content-center align-self-center ms-auto" onClick={onAddExpenseClick}><FontAwesomeIcon icon={faPlus} /></Button>
                {expenses.length !== 0 && <Button variant="secondary" onClick={onViewExpensesClick}><FontAwesomeIcon icon={faEye} /></Button>}
                <Button onClick={() => { budgetId ? deleteBudget(budget) : deleteExpense(UNCATEGORIZED_BUDGET_ID) }} variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
            </Stack>)}
        </Card.Body>
    </Card>
  )
}

function getProgressbarVariant(amount,max){
    const ratio = amount / max
    if(ratio < 0.5) return "success"
    if(ratio < 0.75) return "warning"
    return "danger"
}
