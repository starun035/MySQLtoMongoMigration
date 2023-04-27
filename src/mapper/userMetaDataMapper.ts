import { IUserMetaDataModel } from "../schemas/userMetaDataSchema";

export const sqlToMongoUserMetaData = (userMetaData: any): IUserMetaDataModel => {
    const userMetaDataPersistence: IUserMetaDataModel = {
        userMetaDataId: userMetaData.id,
        userId: userMetaData.userId || null,
        mobileNo: userMetaData.mobileNo,
        versionNo: userMetaData.versionNo,
        versionName: userMetaData.versionName,
        deviceVersionName: userMetaData.deviceVersionName,
        createdAt: userMetaData.createdAt,
        updatedAt: userMetaData.updatedAt
    };
    return userMetaDataPersistence;
}