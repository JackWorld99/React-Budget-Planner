import { Button, Container, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetModal"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto" onClick={() => setShowAddBudgetModal(true)}>Add Budget</h1>
          <Button variant="primary">Add Expense</Button>
        </Stack>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:"1rem", alignItems:"flex-start"}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return(
              <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} />
            )
          })}
        </div>
      </Container>

      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    </>
  )
}

export default App;
