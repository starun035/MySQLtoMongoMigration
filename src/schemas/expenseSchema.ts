import { Schema } from "mongoose";

export interface IExpense {
    expenseId: string;
    name: string;
    expenseDate: Date;
    amount: number;
    desc: string;
    userId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const expenseSchema = new Schema<IExpense>(
    {
      expenseId: { type: String },
      name: { type: String },
      expenseDate: { type: Date },
      amount: { type: Number },
      desc: { type: String },
      userId: { type: String },
      isActive: { type: Boolean }
    },
    { timestamps: true }
);