import { IRefVersion } from "../schemas/refVersionSchema";

export const sqlToMongoRefVersion = (refVersion: any): IRefVersion => {
    const refVersionPersistence: IRefVersion = {
        refVersionId: refVersion.id,
        versionNo: refVersion.versionNo,
        versionName: refVersion.versionName,
        versionNoArray: refVersion.versionNoArray,
        versionNameArray: refVersion.versionNameArray,
        isActive: refVersion.is_active,
        createdAt: refVersion.createdAt,
        updatedAt: refVersion.updatedAt
    };
    return refVersionPersistence;
}