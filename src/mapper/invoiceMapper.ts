import { IInvoice } from "../schemas/invoiceSchema"

export const sqlToMongoInvoice = (invoice: any): IInvoice => {
    const invoicePersistence: IInvoice = {
        invoiceId: invoice.id,
        invoiceDate: invoice.invoiceDate,
        gstInvoiceNo: invoice.gstBillNo,
        nonGstInvoiceNo: invoice.nonGstBillNo,
        discount: invoice.discount,
        totalAmount: invoice.totalAmount,
        totalAmountAfterDiscount: invoice.totalAfterDiscount,
        gstType: invoice.gstType,
        pdfLink: invoice.pdfLink,
        userId: invoice.userid,
        customerName: invoice.customerName,
        customerAddress: invoice.customerAddress,
        customerMobileNo: invoice.customerMobileNo,
        customerGstNo: invoice.GSTNo,
        isActive: invoice.is_active,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt
    };
    return invoicePersistence;
}