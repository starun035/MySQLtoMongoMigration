import { IUserModel } from "../schemas/userSchema";

export const sqlToMongoUser = (user: any): IUserModel =>{
    const userPersistence: IUserModel = {
        userId: user.userid,
        isAdmin: false,
        mobileNo: user.mobileNo,
        name: user.name,
        email: user.email,
        isActive: user.is_active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    return userPersistence;
}