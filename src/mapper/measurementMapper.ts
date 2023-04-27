import { IMeasurementModel } from "../schemas/measurementSchema";

export const sqlToMongoMeasurement = (mesaurement: any): IMeasurementModel =>{
    const userPersistence: IMeasurementModel = {
        measurementId: mesaurement.measurementId,
        measurementName: mesaurement.measurementName,
        measurementAbreviation: mesaurement.measurementAbreviation,
        isActive: mesaurement.is_active || true,
        createdBy: mesaurement.createdBy,
        updatedBy: mesaurement.updatedBy,
        createdAt: mesaurement.createdAt,
        updatedAt: mesaurement.updatedAt
    };
    return userPersistence;
}