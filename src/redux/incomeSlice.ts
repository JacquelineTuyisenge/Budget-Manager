import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IncomeState {
    source: Array<{
        source: string;
        amount: number;
    }>;
}

const initialState: IncomeState = {
    source: [],
};

export const incomeSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<{ source: string; amount: number }>) => {
            state.source.push(action.payload);
        },
    },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;