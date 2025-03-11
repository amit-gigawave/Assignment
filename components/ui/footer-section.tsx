"use client";

import * as React from "react";
import Image from "next/image";

const quickLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Causes",
    href: "/causes",
  },
  {
    name: "Volunteers",
    href: "/join-as-volunteer",
  },
];

const usefulLinks = [
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Terms & Conditions",
    href: "#",
  },
  {
    name: "Privacy Policy",
    href: "#",
  },
];

function Footerdemo() {
  return (
    <footer className="relative border-t bg-secondary-foreground text-foreground transition-colors duration-300 pb-10 sm:pb-0">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="flex justify-around flex-wrap">
          <div className="relative">
            <h2 className="mb-4 text-3xl text-muted flex gap-3 items-center font-bold tracking-tight">
              <Image
                src="/icons/logo2.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-40"
              />
            </h2>
            <p className="mb-6 text-muted max-w-sm">
              Join our newsletter for the latest updates and exclusive offers.
            </p>

            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div className="text-muted">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block transition-colors hover:text-green-500"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="text-muted border-primary">
            <h3 className="mb-4 text-lg font-semibold">Useful Links</h3>
            <nav className="space-y-2 text-sm">
              {usefulLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block transition-colors hover:text-green-500"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex  items-center justify-center gap-4 border-t border-t-neutral-700 pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground text-center ">
            © 2025 Daanakarma.com . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
