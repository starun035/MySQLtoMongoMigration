import { Schema } from "mongoose";

export interface IUserModel {
    userId: string;
    isAdmin: boolean;
    mobileNo: string;
    otp: string;
    name: string;
    email: string;
    userToken: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const userSchema = new Schema<IUserModel>(
    {
        userId: { type: String },
        isAdmin: { type: Boolean },
        mobileNo: { type: String },
        otp: { type: String },
        name: { type: String },
        email: { type: String },
        userToken: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);