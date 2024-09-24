import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";
import { addIncome } from "../redux/incomeSlice";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
function ExpenseForm() {

    interface Income {
        source: string;
        amount: number;
    }
    
    interface Expense {
        category: string;
        amount: number;
    }
    

    const [source, setSource] = useState("");
    const [incomeAmount, setIncomeAmount] = useState<number | string>("");
    const [category, setCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState<number | string>("");

    const dispatch = useDispatch<AppDispatch>();

    //income & expense list
    const [incomeList, setIncomeList] = useState<Income[]>([]);
    const [expenseList, setExpenseList] = useState<Expense[]>([]);

    useEffect(() => {
        const storedIncome = localStorage.getItem("incomeList");
        const storedExpense = localStorage.getItem("expenseList");

        if (storedIncome) setIncomeList(JSON.parse(storedIncome));
        if (storedExpense) setExpenseList(JSON.parse(storedExpense));
    }, []);

    useEffect(() => {
        localStorage.setItem("incomeList", JSON.stringify(incomeList));
        localStorage.setItem("expenseList", JSON.stringify(expenseList));
    }, [incomeList, expenseList]);

    //add incomes
    const handleAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!source || !incomeAmount) {
            alert("Please enter source and income amount");
            return;
        }
        const newIncome = { source, amount: Number(incomeAmount) };
        setIncomeList([...incomeList, newIncome]);
        dispatch(addIncome(newIncome));
        setSource("");
        setIncomeAmount("");
    };

    //add expenses
    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!category || !expenseAmount) {
            alert("Please enter category and expense amount");
            return;
        }
        const newExpense = { category, amount: Number(expenseAmount) };
        setExpenseList([...expenseList, newExpense]);
        dispatch(addExpense(newExpense));
        setCategory("");
        setExpenseAmount("");
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
    const totalExpenses = expenseList.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = totalIncome - totalExpenses;

    return (
        <div className="bg-gray-100 h-screen flex flex-col ">
            <h1 className="text-3xl font-bold text-gray-800 text-center p-20">Budget Manager</h1>
            <div className="bg-white shadow-md rounded-lg p-5 flex lg:flex-row flex-col lg:justify-around gap-5">
                <section className="lg:w-1/3 w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">Income</h1>
                    <div className="bg-blue-100 p-4 rounded-lg mb-6">
                        <p className="text-center">All Income goes here</p>
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
                    <ul>
                        {incomeList.map((income, index) => (
                            <li key={index}>
                                {`${income.source} : ${income.amount} Rwf`}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="lg:w-1/3 w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">Expenses</h1>
                    <div className="bg-blue-100 p-4 rounded-lg mb-6">
                        <p className="text-center">All expenses goes here</p>
                        <form onSubmit={handleAddExpense}>
                            <div className="mb-4">
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
                    <ul>
                        {expenseList.map((expense, index) => (
                            <li key={index}>
                                {`${expense.category} : ${expense.amount} Rwf`}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="lg:w-1/3 w-full mt-12 pb-7">
                    <div className="mb-20 m-5 flex flex-col items-center justify-center border border-blue-400 p-4 shadow-lg">
                        <h2 className="text-2xl text-blue-950 font-bold text-center pb-4">Balance</h2>
                        <div>
                            <div>
                                <p className="font-bold ">Total Income: {totalIncome}Rwf</p>
                            </div>
                            <div>
                                <p className="font-bold ">Total Expenses: {totalExpenses}Rwf</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-white border bg-blue-600 rounded p-2 m-2 border-blue-300">Balance: {balance}RWF</p>
                        </div>
                    </div>
                </section>
            </div>
            
            <div></div>
        </div>
    );
}

export default ExpenseForm;
