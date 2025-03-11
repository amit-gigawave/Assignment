export enum PaymentMethods {
  CASH = "CASH",
  CHEQUE = "CHEQUE",
  UPI = "UPI",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  NET_BANKING = "NET_BANKING",
  NEFT = "NEFT",
  RTGS = "RTGS",
  IMPS = "IMPS",
  OTHERS = "OTHERS",
}
export enum PaymentStatus {
  VERIFIED = "VERIFIED",
  PENDING = "PENDING",
  INVALID = "INVALID",
  REQUESTED = "REQUESTED",
  INITIATED = "INITIATED",
  FAILED = "FAILED",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum CauseStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  STOPPED = "STOPPED",
}

export enum DocEnum {
  jpg = "image/jpg",
  pdf = "application/pdf",
  png = "image/png",
  jpeg = "image/jpeg",
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
