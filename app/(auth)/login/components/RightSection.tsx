import React from "react";

const RightSection = () => {
  return (
    <div className="hidden bg-gradient-to-br from-primary to-secondary/90 md:block">
      <div className="relative flex h-full flex-col items-center justify-center p-8">

        <div className="space-y-4 text-center text-white max-w-lg">
          <h2 className="text-3xl font-bold leading-tight">
            &quot;Making a difference in people&apos;s lives has never been more rewarding&quot;
          </h2>
          <p className="text-base text-white/80 leading-relaxed">
            Join our community of compassionate donors who are transforming lives through
            charitable giving. Every contribution creates lasting positive change.
          </p>
        </div>
      </div>
    </div>
  );
};


export default RightSection;
