import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseSummary = () => {
    const expenses = useSelector((state: RootState) => state.expense.expenses);

    const categories = [...new Set(expenses.map(exp => exp.category))];

    const expenseByCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {} as Record<string, number>);

    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Expenses by Category',
                data: categories.map(category => expenseByCategory[category]),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Summary</h2>
            <Bar data={data} />
        </div>
    );
};

export default ExpenseSummary;
