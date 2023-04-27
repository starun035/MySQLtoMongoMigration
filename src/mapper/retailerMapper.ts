import { IRetailerModel } from "../schemas/retailerSchema";
const { v4: UUID } = require('uuid');

export const sqlToMongoRetailer = (retailer: any): IRetailerModel => {
    const retailerPersistence: IRetailerModel = {
        retailerId: UUID(),
        shopName: retailer.shopName,
        shopAddress: retailer.shopAddr,
        state: retailer.state,
        city: retailer.city,
        pincode: Number(retailer.pincode) ? Number(retailer.pincode) : undefined,
        isGst: retailer.isGST > 0 ? true : false,
        gstNo: retailer.gstNo,
        profileImage: retailer.profileImage,
        signatureImage: retailer.signatureImage,
        companyLogo: retailer.companyLogo,
        bankDetails: retailer.addditionalData,
        tnc: retailer.tnc,
        campaignRefId: retailer.campaignRefId,
        userId: retailer.userid,
        createdAt: retailer.createdAt,
        updatedAt: retailer.updatedAt
    }
    return retailerPersistence;
}