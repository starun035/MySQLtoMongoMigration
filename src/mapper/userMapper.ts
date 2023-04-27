import { IUserModel } from "../schemas/userSchema";

export const sqlToMongoUser = (user: any): IUserModel =>{
    const userPersistence: IUserModel = {
        userId: user.userId,
        isAdmin: false,
        mobileNo: user.mobileNo,
        otp: user.otp,
        name: user.name,
        email: user.email,
        userToken: user.userToken,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    return userPersistence;
}