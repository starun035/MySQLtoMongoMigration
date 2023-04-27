import { IProduct } from "../schemas/productSchema";

export const sqlToMongoProduct = (product: any): IProduct => {
    const productPersistence: IProduct = {
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        priceIncludingGST: product.price,
        gstPercent: product.gst,
        gstAmount: product.gstAmount,
        totalAmount: product.totalAmount,
        hsnCode: product.serial_no,
        imeiNo: product.imei,
        invoiceId: product.invoiceid,
        userId: product.userId,
        measurementId: product.measurementId,
        isActive: product.is_active,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }
    return productPersistence;
}