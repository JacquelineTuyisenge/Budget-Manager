import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IncomeState {
    incomes: Array<{
        source: string;
        amount: number;
    }>;
}

const initialState: IncomeState = {
    incomes: [],
};

export const incomeSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<{ source: string; amount: number }>) => {
            state.incomes.push(action.payload);
        },
    },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;