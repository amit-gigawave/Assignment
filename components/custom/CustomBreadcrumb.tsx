"use client";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { breadcrumbList } from "@/constants/list_constants";
import { cn } from "@/lib/utils";
import React from "react";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
}

export function CustomBreadcrumb({ last }: { last?: string }) {
  const path = usePathname();
  const items: BreadcrumbItemProps[] =
    path === "/"
      ? [
          {
            label: "Home",
            href: "/",
          },
        ]
      : path.split("/").map((item, index) => ({
          label: breadcrumbList[item] || item,
          href: `${path
            .split("/")
            .slice(0, index + 1)
            .join("/")}`,
        }));

  // console.log({ items });
  return (
    <Breadcrumb>
      <BreadcrumbList key={"list"} className="items-end  overflow-hidden">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <Link
                href={item.href || "/"}
                className={cn([
                  "text-secondary-foreground/50 text-base font-semibold hover:text-neutral-600",
                  index === items.length - 1 &&
                    "text-secondary-foreground hover:text-primary",
                ])}
              >
                {!!last && index === items.length - 1 ? last : item.label}
              </Link>
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator
                key={"s" + index}
                className="text-black font-extrabold mb-[0.3rem] "
              />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
