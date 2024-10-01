import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const selectAllExpenses = (state: RootState) => state.expense.expenses;

export const selectExpensesByCategory = (category: string) => createSelector(
  selectAllExpenses,
  (expenses) => expenses.filter((expense) => expense.category === category)
);

export const selectBudgetLimitByCategory = (category: string) => (state: RootState) =>
  state.expense.budgetLimits[category] || null;

export const selectTotalExpensesByCategory = (category: string) => createSelector(
  selectExpensesByCategory(category),
  (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0)
);

export const selectIsOverBudget = (category: string) => createSelector(
  [selectTotalExpensesByCategory(category), selectBudgetLimitByCategory(category)],
  (totalExpenses, budgetLimit) => (budgetLimit !== null ? totalExpenses > budgetLimit : false)
);
