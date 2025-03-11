import { PaymentStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";

interface CustomBadgeProps {
  variant: PaymentStatus;
  className?: string;
}

export const CustomBadge = ({ variant, className }: CustomBadgeProps) => {
  const variants = {
    [PaymentStatus.VERIFIED]: "bg-green-100 text-green-800 border-green-200",
    [PaymentStatus.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [PaymentStatus.INVALID]: "bg-red-100 text-red-800 border-red-200",
    [PaymentStatus.REQUESTED]: "bg-blue-100 text-blue-800 border-blue-200",
    [PaymentStatus.INITIATED]:
      "bg-purple-100 text-purple-800 border-purple-200",
    [PaymentStatus.FAILED]: "bg-red-100 text-red-800 border-red-200",
    [PaymentStatus.PROCESSING]:
      "bg-indigo-100 text-indigo-800 border-indigo-200",
    [PaymentStatus.SUCCESS]: "bg-green-100 text-green-800 border-green-200",
    [PaymentStatus.CANCELLED]: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={cn(
        "px-3  !text-[10px] font-medium rounded-full border",
        variants[variant as keyof typeof variants],
        className
      )}
    >
      {variant}
    </span>
  );
};
