import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type customHeadingType = {
  title?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  isSmall?: boolean;
  className?: string;
};

const CustomHeading: FC<customHeadingType> = ({
  title,
  children,
  subtitle,
  isSmall,
  className,
}) => {
  return (
    <div className={className}>
      {children}
      {title && (
        <h3 className={cn(["text-3xl font-semibold", isSmall && "text-xl"])}>
          {title}
        </h3>
      )}
      {subtitle && (
        <span
          className={cn([
            "text-sm font-medium text-black/30 ",
            isSmall && "text-xs",
          ])}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default CustomHeading;
