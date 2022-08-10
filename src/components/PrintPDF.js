import React from "react"
import { Container, Table, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function PrintPDF({title, budgets, getBudgetExpenses}) {
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
                    <th>Budget categories</th>
                    <th>Budget</th>
                    <th>Expenses</th>
                    <th>Remaining Balance</th>
                </tr>
            </thead>
            <tbody >
                { budgets.map(budget => {
                    const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                    return (
                        <tr key = {budget.id}>
                            <td>{budget.name}</td>
                            <td>{currencyFormatter.format(budget.max)}</td>
                            <td>{currencyFormatter.format(amount)}</td>
                            <td>{currencyFormatter.format(budget.max - amount)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        { budgets.map(budget => {
            const expenses = getBudgetExpenses(budget.id)
            const relate_budget =  budgets.find(b => b.id === budget.id)
           return (
            <>
                <p className="my-2">Budget Name - {budget.name}</p>
                <Table >
                    <thead className="table-primary">
                        <tr>
                            <th>Expense categories </th>
                            <th>Expenses</th>
                            <th>Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
            </>
           )
        })}        
        {/* <p className="my-2">Budget Name - blablabla</p> */}

        {/* <Table >
            <thead className="table-primary">
                <tr>
                    <th>Expense categories </th>
                    <th>Expenses</th>
                    <th>Remaining Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </Table> */}
    </Container>
  )
}