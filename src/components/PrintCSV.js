import { CSVLink} from "react-csv";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import { Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'

export default function PrintCSV() {
    const { budgets, getBudgetExpenses } = useBudgets()

    let total_max = 0
    let total_amount = 0
    let total_remain = 0

    const uncategorized = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
    const uncategorized_expense = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID)
    const uncategorized_total_expense = uncategorized_expense.reduce((total, expense) => total + expense.amount, 0)

    const headers = [
        { label: "Budget categories", key: "budget_categories" },
        { label: "Budget", key: "budget" },
        { label: "Expenses", key: "expenses" },
        { label: "Remaining Balance", key: "remaining_balance" }
      ];

    const data = []
    
    budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        total_max += budget.max
        total_amount += amount
        total_remain += (budget.max - amount)

        return data.push({ budget_categories: budget.name, budget: currencyFormatter.format(budget.max), expenses: currencyFormatter.format(amount), remaining_balance: currencyFormatter.format(budget.max - amount)})
    })
    data.push({budget_categories: "Uncategorized", budget: "Undecided", expenses: currencyFormatter.format(uncategorized), remaining_balance: currencyFormatter.format(uncategorized)})
    data.push({budget_categories: "Total", budget: currencyFormatter.format(total_max), expenses: currencyFormatter.format(total_amount + uncategorized), remaining_balance: currencyFormatter.format(total_remain + uncategorized)})
    data.push({})

    budgets.map(budget => {
        const expenses = getBudgetExpenses(budget.id)
        const Total_expenses = expenses.reduce((total, expense) => total + expense.amount, 0)

        if(expenses.length !== 0 ){
            data.push({budget_categories: budget.name + " - Expenses List"})
            data.push({budget_categories: "Expense categories", budget: "Expenses"})

            expenses.map(expense => {
                return data.push({budget_categories: expense.description, budget: currencyFormatter.format(expense.amount)})
             })
             data.push({budget_categories: "Total", budget: currencyFormatter.format(Total_expenses)})
             data.push({})
        }
        return data                  
    })
    
    if(uncategorized_expense.length !== 0){
      data.push({budget_categories: "Uncategorized - Expenses List"})
      data.push({budget_categories: "Expense categories", budget: "Expenses"})

      uncategorized_expense.map(expense => {
          return data.push({budget_categories: expense.description, budget: currencyFormatter.format(expense.amount)})
        })
        data.push({budget_categories: "Total", budget: currencyFormatter.format(uncategorized_total_expense)})
        data.push({})
    }
      
    return (
    <CSVLink data={data} headers={headers}><Button variant="outline-warning"><FontAwesomeIcon icon={faFileCsv} /></Button></CSVLink>
  )
}
