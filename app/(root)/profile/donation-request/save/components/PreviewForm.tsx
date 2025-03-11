import CustomHeading from "@/components/custom/CustomHeading";
import { DonationRequestType } from "@/models/schema";
import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Tag,
  MapPin,
  Image,
  Video,
  FileText,
  Users,
  IndianRupee,
  Calendar,
  Banknote,
  CreditCard,
  Building,
  Hash,
  LucideIcon,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useGetCategoriesQuery } from "@/services/query/causeQuery";
import CustomLoader from "@/components/custom/CustomLoader";

type PreviewProps = {
  form: UseFormReturn<DonationRequestType>;
  title: string;
  description: string;
  delta: number;
};

const PreviewForm = ({ form, delta }: PreviewProps) => {
  const { data: categories, isPending } = useGetCategoriesQuery();
  const formData = form.getValues() as DonationRequestType;

  const category = categories!
    .map((cat) => {
      if (formData.categories.includes(cat.id)) {
        return cat.name;
      }
    })
    .join(", ");
  const guaranteers = [
    {
      name: formData.primaryGuaranteerName,
      number: formData.primaryGuaranteerPhone,
    },
    {
      name: formData.secondaryGuaranteerName,
      number: formData.secondaryGuaranteerPhone,
    },
  ];
  const SectionTitle = ({
    title,
    icon: Icon,
  }: {
    title: string;
    icon: LucideIcon;
  }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="bg-orange-100 p-2 rounded-lg">
        <Icon className="w-5 h-5 text-orange-600" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );

  const InfoItem = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value?: string | number;
    icon?: LucideIcon;
  }) => (
    <div className="flex items-start gap-3 p-3 hover:bg-orange-50/50 rounded-lg transition-colors">
      {Icon && <Icon className="w-4 h-4 text-gray-500 mt-1" />}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-base font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="pb-4 space-y-8 rounded-t-xl"
    >
      {isPending ? (
        <CustomLoader />
      ) : (
        <>
          <CustomHeading
            title="Preview Your Request"
            subtitle="Please review all details before submitting"
            isSmall
            className="pt-5"
          />

          {/* Basic Information */}
          <div className="space-y-4">
            <SectionTitle title="Basic Information" icon={User} />
            <div className="bg-white/60 p-4 rounded-xl shadow-sm border border-orange-100/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InfoItem
                  label="Title"
                  value={formData.title}
                  icon={FileText}
                />
                <InfoItem label="Name" value={formData.name} icon={User} />
                <div className="md:col-span-2">
                  <InfoItem
                    label="Description"
                    value={formData.description}
                    icon={FileText}
                  />
                </div>
                <InfoItem label="Category" value={category} icon={Tag} />
                <InfoItem
                  label="Contact Numbers"
                  value={formData.phones?.map((n) => n).join(", ")}
                  icon={Phone}
                />
                <InfoItem
                  label="Email Addresses"
                  value={formData.emails?.map((e) => e).join(", ")}
                  icon={Mail}
                />
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-4">
            <SectionTitle title="Address Details" icon={MapPin} />
            <div className="bg-white/60 p-6 rounded-xl shadow-sm border border-orange-100/50">
              <div className="space-y-2">
                <p className="font-medium">{formData.address?.street}</p>
                <p>{formData.address?.area}</p>
                <p className="text-gray-600">
                  {formData.address?.city}, {formData.address?.district}
                </p>
                <p className="text-gray-600">
                  {formData.address?.state}, {formData.address?.country} -{" "}
                  {formData.address?.zipcode}
                </p>
                {formData.address?.landmark && (
                  <p className="mt-2 text-gray-500">
                    <span className="font-medium">Landmark:</span>{" "}
                    {formData.address.landmark}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-4">
            <SectionTitle title="Media" icon={Image} />
            <div className="bg-white/60 p-6 rounded-xl shadow-sm border border-orange-100/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  label="Images Selected"
                  value={`${formData.images?.length || 0} images`}
                  icon={Image}
                />
                {formData.videos && (
                  <InfoItem
                    label="Video Selected"
                    value="1 video"
                    icon={Video}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Documents & Guaranteers */}
          <div className="space-y-4">
            <SectionTitle title="Documents & Guaranteers" icon={FileText} />
            <div className="bg-white/60 p-6 rounded-xl shadow-sm border border-orange-100/50">
              <InfoItem
                label="Documents Uploaded"
                value={`${formData.documents?.length || 0} documents`}
                icon={FileText}
              />

              {guaranteers && guaranteers.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Guaranteers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guaranteers.map((g, i) => (
                      <div key={i} className="p-3 bg-orange-50/50 rounded-lg">
                        <p className="font-medium">{g.name}</p>
                        <p className="text-gray-600">{g.number}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amount Details */}
          <div className="space-y-4">
            <SectionTitle title="Amount Details" icon={IndianRupee} />
            <div className="bg-white/60 p-6 rounded-xl shadow-sm border border-orange-100/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  label="Amount Required"
                  value={`₹${formData.amount?.toLocaleString()}`}
                  icon={IndianRupee}
                />
                <InfoItem
                  label="Deadline"
                  value={formData.deadline?.toLocaleDateString()}
                  icon={Calendar}
                />
              </div>

              <div className="mt-6 p-4 bg-orange-50/50 rounded-xl">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Banknote className="w-4 h-4" />
                  Bank Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Account Holder"
                    value={formData.bankDetails?.holderName}
                  />
                  <InfoItem
                    label="Bank Name"
                    value={formData.bankDetails?.bankName}
                  />
                  <InfoItem
                    label="Branch"
                    value={formData.bankDetails?.branchName}
                  />
                  <InfoItem
                    label="Account Number"
                    value={formData.bankDetails?.accountNumber}
                  />
                  <InfoItem
                    label="IFSC Code"
                    value={formData.bankDetails?.ifscCode}
                  />
                  <InfoItem
                    label="UPI ID"
                    value={formData.bankDetails?.upiID}
                    icon={CreditCard}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Aadhar Number"
                  value={formData.identity.aadharNumber}
                  icon={Hash}
                />
                {formData.identity.panNumber && (
                  <InfoItem
                    label="PAN Number"
                    value={formData.identity.panNumber}
                    icon={Building}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default PreviewForm;
