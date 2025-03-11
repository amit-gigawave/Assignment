import { z } from "zod";

const phonePattern = /^[6-9]\d{9}$/;

export const DonationRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  categories: z
    .array(z.string().trim())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phones: z
    .array(
      z.string().regex(phonePattern, "Phone number must be at least 10 digits")
    )
    .min(1, "At least one phone number is required")
    .max(3, "Maximum of 3 phone numbers allowed"),
  emails: z
    .array(z.string().email("Email is invalid"))
    .min(1, "At least one Email is required")
    .max(2, "Maximum of 2 Emails allowed"),
  address: z.object({
    street: z
      .string()
      .trim()
      .min(5, "Street address must be at least 5 characters")
      .max(50),
    area: z
      .string()
      .trim()
      .min(3, "Area must be at least 3 characters")
      .max(50),
    city: z
      .string()
      .trim()
      .min(2, "City name must be at least 2 characters")
      .max(30),
    district: z
      .string()
      .trim()
      .min(2, "District name must be at least 2 characters")
      .max(30),
    zipcode: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Zipcode must be 6 digits"),
    state: z
      .string()
      .trim()
      .min(2, "State name must be at least 2 characters")
      .max(30),
    country: z
      .string()
      .trim()
      .min(2, "Country name must be at least 2 characters")
      .max(30),
    landmark: z.string().trim().max(50).optional(),
  }),
  images: z
    .array(z.string().url())
    .min(1, "At least one image is required")
    .max(5, "Maximum of 5 images allowed"),
  videos: z.array(z.string().url()).nullable().optional(),
  documents: z
    .array(z.string().url())
    .min(1, "At least one document is required")
    .max(2, "Maximum of 2 documents allowed"),
  primaryGuaranteerName: z
    .string()
    .trim()
    .min(3, "Guaranteer name must be at least 3 characters")
    .max(50),
  primaryGuaranteerPhone: z
    .string()
    .trim()
    .regex(phonePattern, "Phone number must be at least 10 digits"),
  secondaryGuaranteerName: z
    .string()
    .trim()
    .min(3, "Guaranteer name must be at least 3 characters")
    .max(50)
    .nullable()
    .optional(),
  secondaryGuaranteerPhone: z
    .string()
    .trim()
    .regex(phonePattern, "Phone number must be at least 10 digits")
    .nullable()
    .optional(),
  bankDetails: z.object({
    accountNumber: z
      .string()
      .regex(/^\d{9,18}$/, "Account number must be between 9 and 18 digits"),
    ifscCode: z
      .string()
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
    branchName: z
      .string()
      .trim()
      .min(3, "Branch name must be at least 3 characters")
      .max(50),
    bankName: z
      .string()
      .trim()
      .min(3, "Bank name must be at least 3 characters")
      .max(50),
    holderName: z
      .string()
      .trim()
      .min(3, "Account holder name must be at least 3 characters")
      .max(50),
    upiID: z
      .string()
      .regex(/^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/, "Invalid UPI ID format")
      .optional(),
  }),
  identity: z.object({
    aadharNumber: z
      .string()
      .regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits"),
    panNumber: z
      .string()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format")
      .nullable()
      .optional(),
  }),

  amount: z.number().min(10000, "Amount must be greater than ₹ 10,000"),
  deadline: z
    .date()
    .min(
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      "Deadline must be at least 5 days in the future"
    )
    .max(
      new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      "Deadline cannot be more than 180 days in the future"
    ),
});

export type DonationRequestType = z.infer<typeof DonationRequestSchema>;

export const DonationResponceSchema = DonationRequestSchema.extend({
  id: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  fundRaised: z.number().default(0),
  totalDonations: z.number().default(0),
});

export type DonationResponceType = z.infer<typeof DonationResponceSchema>;

export const CauseSearchSchema = DonationRequestSchema.pick({
  title: true,
  categories: true,
  deadline: true,
  amount: true,
  images: true,
}).extend({
  id: z.string(),
  fundRaised: z.number(),
  totalDonations: z.number().default(0),
});

export type CauseSearchType = z.infer<typeof CauseSearchSchema>;

export const VolunteerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phonePattern, "Phone number must be 10 digits"),
  about: z.string().min(5, "Tell us about yourself"),
});

export type VolunteerType = z.infer<typeof VolunteerSchema>;

export const DonationSchema = z.object({
  amount: z.number().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment mode is required"),
  isAnonomous: z.boolean().optional(),
  receipt: z.string().url().min(1, "Attachment is required"),
  paymentId: z.string().optional(),
  causeId: z.string().min(1, "CauseId is required"),
});

export type DonationType = z.infer<typeof DonationSchema>;

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  photo: z.string().url(),
});

export const DonationRecieptSchema = z.object({
  id: z.string().uuid(),
  causeId: z.string().uuid(),
  amount: z.number(),
  title: z.string(),
  paymentMethod: z.string(),
  receipt: z.string().url().optional(),
  paymentOn: z.string(),
  paymentId: z.string().optional(),
  status: z.string(),
});

export type DonationRecieptType = z.infer<typeof DonationRecieptSchema>;

export const CauseDetailsSchema = DonationRequestSchema.extend({
  id: z.string(),
  fundRaised: z.number(),
  totalDonations: z.number().default(0),
});
export type CauseDetailsType = z.infer<typeof CauseDetailsSchema>;

export const UserAuthSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().nullable(),
  authType: z.enum(["EMAIL", "PHONE", "GOOGLE"]),
  email: z.string().email("Invalid email address").nullable(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number")
    .nullable(),
  image: z.string().url("Invalid image URL").nullable(),
});

export type UserAuthType = z.infer<typeof UserAuthSchema>;

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  causeId: z.string().uuid(),
  isAnonomous: z.boolean().default(false),
  paymentId: z.string().nullable(),
  amount: z.number(),
  paymentMethod: z.string(),
  receipt: z.string().url().nullable(),
  isGateway: z.boolean().default(false),
  paymentOn: z.string().datetime().nullable(),
  paymentstatus: z.string(),
  settlementStatus: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  user: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string().nullable(),
    })
    .nullable(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;

export const TransactionListSchema = z.object({
  causeDetails: z.object({
    id: z.string().uuid(),
    title: z.string(),
    amount: z.number(),
    fundRaised: z.number().nullable(),
    totalDonations: z.number().default(0),
    status: z.string(),
    deadline: z.string().datetime(),
  }),
  transactions: z.array(TransactionSchema),
});

export type TransactionListType = z.infer<typeof TransactionListSchema>;
