import React from "react";
import RightSection from "./login/components/RightSection";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="grid h-screen w-screen md:grid-cols-[1fr,1fr]">
      <div className="flex justify-center h-screen overscroll-hidden">
        {children}
      </div>
      <RightSection />
    </section>
  );
};

export default AuthLayout;
