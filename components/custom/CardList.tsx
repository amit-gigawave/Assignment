import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Item = { title: string; description?: string; icon?: string };
const CardList = ({
  items,
  className,
  cardClassName,
}: {
  items: Item[];
  className?: string;
  cardClassName?: string;
}) => {
  return (
    <section
      className={cn([
        "p-12 md:px-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
        className,
      ])}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          className={cn([
            "shadow-none border-none rounded-3xl ",
            cardClassName,
          ])}
        >
          <CardHeader className="flex flex-col items-center gap-3">
            {item.icon && (
              <Image
                src={item.icon}
                alt={item.title}
                width={100}
                height={100}
                className="size-12"
              />
            )}
            <CardTitle className="text-2xl">{item.title}</CardTitle>
            <CardDescription className=" text-center text-base">
              {item.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </section>
  );
};

export default CardList;
