import {
  LucideIcon,
  User,
  FileText,
  Tag,
  Phone,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { DonationRequestType } from "@/models/schema";
export const SectionTitle = ({
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

export const InfoItem = ({
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
export default function Details({ cause }: { cause: DonationRequestType }) {
  return (
    <div className="space-y-8 !mt-8">
      <div className="space-y-4">
        <SectionTitle title="Basic Information" icon={User} />
        <div className="bg-white/60 p-4 rounded-xl shadow-sm border border-orange-100/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InfoItem label="Name" value={cause.name} icon={User} />
            <InfoItem
              label="Category"
              value={cause.categories?.join(", ")}
              icon={Tag}
            />
            <InfoItem
              label="Contact Numbers"
              value={cause.phones?.join(", ")}
              icon={Phone}
            />
            <InfoItem
              label="Email Addresses"
              value={cause.emails?.join(", ")}
              icon={Mail}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="space-y-4">
        <SectionTitle title="Description" icon={FileText} />
        <div className="bg-white/60 p-4 rounded-xl shadow-sm border border-orange-100/50">
          <p className="text-gray-700 whitespace-pre-wrap">
            {cause.description}
          </p>
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-4">
        <SectionTitle title="Address Details" icon={MapPin} />
        <div className="bg-white/60 p-6 rounded-xl shadow-sm border border-orange-100/50">
          <div className="space-y-2">
            <p className="font-medium">{cause.address?.street}</p>
            <p>{cause.address?.area}</p>
            <p className="text-gray-600">
              {cause.address?.city}, {cause.address?.district}
            </p>
            <p className="text-gray-600">
              {cause.address?.state}, {cause.address?.country} -{" "}
              {cause.address?.zipcode}
            </p>
            {cause.address?.landmark && (
              <p className="mt-2 text-gray-500">
                <span className="font-medium">Landmark:</span>{" "}
                {cause.address.landmark}
              </p>
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
            value={`${cause.documents?.length || 0} documents`}
            icon={FileText}
          />

          {cause.primaryGuaranteerName && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Guaranteers
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-orange-50/50 rounded-lg">
                  <p className="font-medium">{cause.primaryGuaranteerName}</p>
                  <p className="text-gray-600">
                    {cause.primaryGuaranteerPhone}
                  </p>
                </div>
                {cause.secondaryGuaranteerName && (
                  <div className="p-3 bg-orange-50/50 rounded-lg">
                    <p className="font-medium">
                      {cause.secondaryGuaranteerName}
                    </p>
                    <p className="text-gray-600">
                      {cause.secondaryGuaranteerPhone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Amount Details */}
    </div>
  );
}
