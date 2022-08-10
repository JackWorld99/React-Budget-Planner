import { Button, Container, Navbar, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import TotalBudgetCard from "./components/TotalBudgetCard"
import PrintModal from "./components/PrintModal"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Navbar className="color-nav" variant="dark">
        <Container> 
          <Navbar.Brand href="#home">
            <h1 className="me-auto">Budget</h1>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Stack direction="horizontal" gap="2">
              <Button variant="outline-warning" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
              <Button variant="outline-warning" onClick={openAddExpenseModal}>Add Expense</Button>
              <Button variant="outline-warning" onClick={() => setShowPrintModal(true)}><FontAwesomeIcon icon={faPrint} /></Button>
            </Stack>
          </Navbar.Collapse>
        </Container> 
      </Navbar>
      <Container className="my-4">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:"1rem", alignItems:"flex-start"}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return(
              <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} onAddExpenseClick={() => openAddExpenseModal(budget.id)} onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id) } budgetId={budget.id}/>
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID) }/>
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()} />
      <PrintModal show={showPrintModal} handleClose={() => setShowPrintModal(false)} />
    </>
  )
}

export default App;
