import { Schema } from "mongoose"

export interface IRefVersion {
    refVersionId: string;
    versionNo: number;
    versionName: string;
    versionNoArray: string;
    versionNameArray: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string
};

export const refVersionSchema = new Schema<IRefVersion>(
    {
        refVersionId: { type: String },
        versionNo: { type: Number },
        versionName: { type: String },
        versionNoArray: { type: String },
        versionNameArray: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);