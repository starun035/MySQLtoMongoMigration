import { Schema } from "mongoose";

export interface IRetailerModel {
    retailerId: string;
    shopName: string;
    shopAddress: string;
    state: string;
    city: string;
    pincode?: number;
    isGst?: boolean;
    gstNo: string;
    profileImage: string;
    signatureImage: string;
    companyLogo: string;
    bankDetails: string;
    tnc: string;
    campaignRefId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
  
export const retailerSchema = new Schema<IRetailerModel>(
    {
      retailerId: { type: String },
      shopName: { type: String },
      shopAddress: { type: String },
      state: { type: String },
      city: { type: String },
      pincode: { type: Number },
      isGst: { type: Boolean },
      gstNo: { type: String },
      profileImage: { type: String },
      signatureImage: { type: String },
      companyLogo: { type: String },
      bankDetails: { type: String },
      tnc: { type: String },
      campaignRefId: { type: String },
      userId: { type: String }
    },
    { timestamps: true }
  );