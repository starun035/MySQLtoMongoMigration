import { Schema } from "mongoose";

export interface IUserMetaDataModel {
    userMetaDataId: string;
    userId: string;
    mobileNo: string;
    versionNo: string;
    versionName: string;
    deviceVersionName: string;
    createdAt: string;
    updatedAt: string;
};

export const userMetaDataSchema = new Schema<IUserMetaDataModel>(
    {
      userMetaDataId: { type: String, required: true },
      userId: { type: String },
      mobileNo: { type: String },
      versionNo: { type: String },
      versionName: { type: String },
      deviceVersionName: { type: String }
    },
    { timestamps: true }
);