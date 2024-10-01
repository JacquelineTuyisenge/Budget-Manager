import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../redux/expenseSlice";
import { addIncome } from "../redux/incomeSlice";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import ExpenseSummary from "./ExpenseSummary";

function ExpenseForm() {

    interface Income {
        source: string;
        amount: number;
    }
    
    interface Expense {
        category: string;
        amount: number;
        date: string;
    }
    

    const [source, setSource] = useState("");
    const [incomeAmount, setIncomeAmount] = useState<number | string>("");
    const [category, setCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState<number | string>("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const expenses = useSelector((state: RootState) => state.expense.expenses);
    const incomeList = useSelector((state: RootState) => state.income.incomes);

    //income & expense list
    const [expenseList, setExpenseList] = useState<Expense[]>([]);

    useEffect(() => {
        const storedExpense = localStorage.getItem("expenseList");

        if (storedExpense) setExpenseList(JSON.parse(storedExpense));
    }, []);

    //add incomes
    const handleAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!source || !incomeAmount) {
            alert("Please enter source and income amount");
            return;
        }
        const newIncome = { source, amount: Number(incomeAmount) };
        dispatch(addIncome(newIncome));
        setSource("");
        setIncomeAmount("");
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    //add expenses
    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!category || !expenseAmount) {
            alert("Please enter category and expense amount");
            return;
        }
        const newExpense = { category, amount: Number(expenseAmount), date };
        const newTotalExpenses = totalExpenses + newExpense.amount;

        if (newTotalExpenses > totalIncome) {
            alert("You cannot spend more than your income");
            return;
        }

        setExpenseList([...expenseList, newExpense]);
        dispatch(addExpense(newExpense));
        setCategory("");
        setExpenseAmount("");
        setDate("");
    };

    //input changes

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource(e.target.value);
    };

    const handleIncomeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeAmount(Number(e.target.value));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    const handleExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseAmount(Number(e.target.value));
    };

    //total calculation

    const totalIncome = incomeList.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    const balance = totalIncome - totalExpenses;

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800 text-center py-20">Budget Manager</h1>
            <div className="shadow-md rounded-lg p-8 flex lg:flex-row flex-col lg:justify-around gap-5">
                <section className="lg:w-1/2 w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">Income</h1>
                    <div className="bg-blue-200 p-4 rounded-lg mb-6">
                        <form onSubmit={handleAddIncome}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source" aria-label="source">
                                    Source:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="source"
                                    type="text"
                                    placeholder="source"
                                    value={source}
                                    onChange={handleSourceChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="income-amount" aria-label="income-amount">
                                    Amount:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="income-amount"
                                    type="number"
                                    placeholder="amount"
                                    value={incomeAmount}
                                    onChange={handleIncomeAmountChange}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 text-white hover:bg-blue-700 text-white-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Add Income
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Income list */}
                    <ul className="list-none bg-white shadow-md rounded-lg p-4">
                        <li className="font-bold text-gray-800 mb-2 pb-2">Income List</li>
                        {incomeList.map((income, index) => (
                            <li key={index} className="mb-2 border-b border-gray-200 pb-2">
                                <span className="font-bold text-green-700">{income.source}</span> : 
                                <span className="text-gray-800"> {income.amount} Rwf</span>
                            </li>
                        ))}
                    </ul>

                </section>
                <section className="lg:w-1/2 w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">Expenses</h1>
                    <div className="bg-blue-200 p-4 rounded-lg mb-6">
                        <form onSubmit={handleAddExpense}>
                            <div className="flex mb-4">
                               <div className="flex-1 mr-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date" aria-label="date">
                                        Date:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="date"
                                        type="date"
                                        placeholder="date"
                                        value={date}
                                        onChange={handleDateChange}
                                    />
                               </div>
                            
                                <div className="flex-1 m">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category" aria-label="category">
                                        Category:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="category"
                                        type="text"
                                        placeholder="category"
                                        value={category}
                                        onChange={handleCategoryChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expense-amount" aria-label="expense-amount">
                                    Amount:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="expense-amount"
                                    type="number"
                                    placeholder="amount"
                                    value={expenseAmount}
                                    onChange={handleExpenseAmountChange}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* <ExpenseList /> */}
                    <ul className="list-none bg-white shadow-md rounded-lg p-4">
                    <li className="font-bold text-gray-800 mb-2 pb-2">Expense List</li>
                        {expenseList.map((expense, index) => (
                            <li key={index} className="mb-2 border-b border-gray-200 pb-2">
                                <span className="font-bold text-blue-400">{expense.category}</span> : 
                                <span className="text-gray-800"> {expense.amount} Rwf</span> on 
                                <span className="text-gray-500"> {expense.date}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <div className="shadow-md rounded-lg p-8 flex lg:flex-row flex-col lg:justify-around gap-5">
                <section className="lg:w-1/3 w-full p-2">
                <div className="bg-blue-200 p-4 rounded-lg flex flex-col items-center">
                    <h2 className="text-2xl text-blue-950 font-bold text-center pb-4">Balance</h2>
                    <div className="flex flex-wrap justify-center w-full mb-4">
                        <div className="flex-1 text-center">
                            <p className="font-bold">Total Income: {totalIncome} Rwf</p>
                        </div>
                        <div className="flex-1 text-center">
                            <p className="font-bold">Total Expenses: {totalExpenses} Rwf</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-white border bg-blue-500 rounded p-2 m-2 border-blue-300 text-center">
                            Balance: {balance} RWF
                        </p>
                    </div>
                </div>
                </section>
                <section className="lg:w-2/3 w-full p-2">
                    <ExpenseSummary />
                </section>
            </div>
        </div>
    );
}

export default ExpenseForm;
