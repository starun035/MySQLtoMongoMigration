import { Schema } from "mongoose";

export interface IProduct {
  productId: string;
  name: string;
  quantity: number;
  priceIncludingGST: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
  hsnCode: string;
  imeiNo: string;
  invoiceId: string;
  userId: string;
  measurementId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string
}

export const productSchema = new Schema<IProduct>(
    {
      productId: { type: String },
      name: { type: String },
      quantity: { type: Number },
      priceIncludingGST: { type: Number },
      gstPercent: { type: Number },
      gstAmount: { type: Number },
      totalAmount: { type: Number },
      hsnCode: { type: String },
      imeiNo: { type: String },
      invoiceId: { type: String },
      userId: { type: String },
      measurementId: { type: String },
      isActive: { type: Boolean }
    },
    { timestamps: true }
);