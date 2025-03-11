import CardList from "@/components/custom/CardList";
import { cn } from "@/lib/utils";
import React from "react";

const Stats = ({
  className,
  cardClassName,
}: {
  className?: string;
  cardClassName?: string;
}) => {
  const stats = [
    {
      title: "1.2K+",
      description: "Projects Completed",
      icon: "/icons/rocket.svg",
    },
    {
      title: "100",
      description: "Monthly Donate",
      icon: "/icons/donate.svg",
    },
    {
      title: "480",
      description: "Partners",
      icon: "/icons/earth.svg",
    },
    {
      title: "1.4m",
      description: "Donation Received",
      icon: "/icons/donate2.svg",
    },
  ];
  return (
    <CardList
      items={stats}
      className={cn(["bg-transparent", className])}
      cardClassName={cardClassName}
    />
  );
};

export default Stats;
