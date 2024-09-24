import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseState {
    expenses: Array<{
        category: string;
        amount: number;
    }>;
}

const initialState: ExpenseState = {
    expenses: [],
};

export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<{ category: string; amount: number }>) => {
            state.expenses.push(action.payload);
        },
    },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;