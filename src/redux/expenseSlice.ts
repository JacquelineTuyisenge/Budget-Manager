import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseState {
    expenses: Array<{
        category: string;
        amount: number;
        date: string;
    }>;
    budgetLimits: Record<string, number>;
}

const initialState: ExpenseState = {
    expenses: [],
    budgetLimits: {},
};

export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<{ category: string; amount: number; date: string }>) => {
            state.expenses.push(action.payload);
        },
        setBudgetLimit: (state, action: PayloadAction<{ category: string; limit: number }>) => {
            state.budgetLimits[action.payload.category] = action.payload.limit;
        },
        clearBudgetLimit: (state, action: PayloadAction<{ category: string}>) => {
            delete state.budgetLimits[action.payload.category];
        },
    },
});

export const { addExpense, setBudgetLimit, clearBudgetLimit } = expenseSlice.actions;
export default expenseSlice.reducer;