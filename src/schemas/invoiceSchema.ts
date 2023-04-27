import { Schema } from "mongoose";

export interface IInvoice {
    invoiceId: string;
    invoiceDate: Date;
    gstInvoiceNo: number;
    nonGstInvoiceNo: number;
    discount: number;
    totalAmount: number;
    totalAmountAfterDiscount: number;
    gstType: string;
    pdfLink: string;
    userId: string;
    customerName: string;
    customerAddress: string;
    customerMobileNo: string;
    customerEmail?: string;
    customerGstNo: string;
    isActive: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export const invoiceSchema = new Schema<IInvoice>(
    {
        invoiceId: { type: String },
        invoiceDate: { type: Date },
        gstInvoiceNo: { type: Number, },
        nonGstInvoiceNo: { type: Number },
        discount: { type: Number },
        totalAmount: { type: Number },
        totalAmountAfterDiscount: { type: Number },
        gstType: { type: String },
        pdfLink: { type: String },
        userId: { type: String },
        customerName: { type: String },
        customerAddress: { type: String },
        customerMobileNo: { type: String },
        customerEmail: { type: String },
        customerGstNo: { type: String },
        isActive: { type: Boolean },
        createdBy: { type: String },
        updatedBy: { type: String }
    },
    {
        timestamps: true
    }
);