import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../redux/incomeSlice";
import expenseReducer from "../redux/expenseSlice";

export const store = configureStore({
    reducer: {
        income: incomeReducer,
        expense: expenseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;