import { Schema } from "mongoose";

export interface IUserModel {
    userId: string;
    isAdmin: boolean;
    mobileNo: string;
    name: string;
    email?: boolean;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
export const userSchema = new Schema<IUserModel>(
    {
        userId: { type: String },
        isAdmin: { type: Boolean },
        mobileNo: { type: String },
        name: { type: String },
        email: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);