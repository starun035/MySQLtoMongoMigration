import { Schema } from "mongoose";

export interface IMeasurementModel {
    measurementId: string;
    measurementName: string;
    measurementAbreviation: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    // ? fields are only required when we are converting the data and it is possibly not available
};

export const measurementSchema = new Schema<IMeasurementModel>(
    {
        measurementId: { type: String },
        measurementName: { type: String },
        measurementAbreviation: { type: String },
        isActive: { type: Boolean },
        createdBy: { type: String },
        updatedBy: { type: String }
    },
    { timestamps: true }
);