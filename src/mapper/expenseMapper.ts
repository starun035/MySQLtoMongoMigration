import { IExpense } from "../schemas/expenseSchema";

export const sqlToMongoExpense = (expense: any): IExpense => {
    const expensePersistence: IExpense = {
        expenseId: expense.id,
        name: expense.name,
        expenseDate: expense.expenseDate,
        amount: expense.amount,
        desc: expense.desc,
        userId: expense.userid,
        isActive: expense.is_active,
        createdAt: expense.createdAt,
        updatedAt: expense.updatedAt
    };
    return expensePersistence;
}