import React from "react"
import { Container, Table, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function PrintPDF({title, budgets, getBudgetExpenses,UNCATEGORIZED_BUDGET_ID}) {
    let total_max = 0
    let total_amount = 0
    let total_remain = 0

    const uncategorized = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
    const uncategorized_expense = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID)
    const uncategorized_total_expense = uncategorized_expense.reduce((total, expense) => total + expense.amount, 0)

  return (
    <Container className="mx-2">
        <Stack className="my-5">
            <div className="text-center"><h1>{title ? title : "Annual Budget Report"}</h1></div>
        </Stack>
        {/* <Stack className="my-4">
            <div className="text-center"><h1>Annual Budget Report</h1></div>
            <div className="mt-5">
                <p className="fw-bold">Company Name:</p>
                <p className="fw-bold">Project Name:</p>
                <p className="fw-bold">Project Manager:</p>
            </div>
        </Stack> */}
        <Table>
            <thead className="table-primary">
                <tr>
                    <th>Budget Categories</th>
                    <th>Budget</th>
                    <th>Expenses</th>
                    <th>Remaining Balance</th>
                </tr>
            </thead>
            <tbody >
                { budgets.map(budget => {
                    const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                    total_max += budget.max;
                    total_amount += amount
                    total_remain += (budget.max - amount)
                    return (
                        <tr key = {budget.id}>
                            <td>{budget.name}</td>
                            <td>{currencyFormatter.format(budget.max)}</td>
                            <td>{currencyFormatter.format(amount)}</td>
                            <td>{currencyFormatter.format(budget.max - amount)}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td>Uncategorized</td>
                    <td>Undecided</td>
                    <td>{currencyFormatter.format(uncategorized)}</td>
                    <td>{currencyFormatter.format(uncategorized)}</td>
                </tr>
                <tr className="fst-italic fw-bold">
                    <td>Total</td>
                    <td>{currencyFormatter.format(total_max)}</td>
                    <td>{currencyFormatter.format(total_amount + uncategorized)}</td>
                    <td>{currencyFormatter.format(total_remain + uncategorized)}</td>
                </tr>
            </tbody>
        </Table>
        { budgets.map(budget => {
            const expenses = getBudgetExpenses(budget.id)
            const Total_expenses = expenses.reduce((total, expense) => total + expense.amount, 0)
           return (
                <div key={budget.id}>
                    {expenses.length !== 0 && (
                        <>
                            <p className="my-2">{budget.name} - Expenses List</p>
                            <Table>
                                <thead className="table-primary">
                                    <tr>
                                        <th>Expense categories </th>
                                        <th>Expenses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map(expense => {
                                        return (
                                            <tr key = {expense.id}>
                                                <td>{expense.description}</td>
                                                <td>{currencyFormatter.format(expense.amount)}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr className="fst-italic fw-bold">
                                        <td>Total</td>
                                        <td>{currencyFormatter.format(Total_expenses)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>)
                    }
                </div>
           )
        })}   
        
        {uncategorized_expense.length !== 0 && (
            <>
                <p className="my-2">Uncategorized Expense List</p>
                <Table>
                    <thead className="table-primary">
                        <tr>
                            <th>Expense categories </th>
                            <th>Expenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uncategorized_expense.map(expense => {
                            return (
                                <tr key = {expense.id}>
                                    <td>{expense.description}</td>
                                    <td>{currencyFormatter.format(expense.amount)}</td>
                                </tr>
                            )
                        })}
                        <tr className="fst-italic fw-bold">
                            <td>Total</td>
                            <td>{currencyFormatter.format(uncategorized_total_expense)}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )}
    </Container>
  )
}