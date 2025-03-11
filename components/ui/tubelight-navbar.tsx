"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  name: string;
  url: string;
  icon: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname();
  // console.log(pathname.split("/"));
  const [activeTab, setActiveTab] = useState(pathname.split("/")[1]);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 sm:pt-6 h-fit mb-4",
        className
      )}
    >
      <div className="flex items-center bg-gray-100/70 justify-center gap-2 w- sm:border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {/* <div className="flex items-center gap-2 px-2 size-10 md:w-fit">
          <Image
            src="/icons/charity.svg"
            alt="Logo"
            width={100}
            height={100}
            className="size-8 md:size-6"
          />
          <span className="text-base font-bold hidden md:inline">
            DHANA KARMA
          </span>
        </div> */}
        {items.map((item, index) => {
          const isActive = activeTab === item.url.split("/")[1];

          return (
            <div
              key={item.name}
              // href={item.url}
              onClick={() => {
                router.push(item.url);
                setActiveTab(item.url.split("/")[1]);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-2 py-2.5  rounded-full transition-colors ",
                "text-foreground/80 hover:text-primary flex  items-center min-w-[100px] justify-center gap-2",
                isActive && "bg-muted text-primary",
                !isMobile &&
                  index === items.length - 1 &&
                  "bg-gradient-to-br from-primary/70 to-primary text-white hover:text-white px-4"
              )}
              // prefetch={true}
            >
              {/* <span className="md:hidden"> */}
              <Image
                src={item.icon}
                alt={item.name}
                width={100}
                height={100}
                className="size-5 bg-primary bg-clip-text "
              />
              {/* </span> */}
              <p
                className={cn([
                  "text-xs sm:text-sm whitespace-nowrap transition-all duration-500 md:w-fit",
                  !isActive && "w-0 overflow-hidden",
                ])}
              >
                {item.name}
              </p>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
