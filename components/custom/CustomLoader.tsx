import { Loader2 } from "lucide-react";
import React from "react";

const CustomLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader2 className="animate-spin size-5" />
    </div>
  );
};

export default CustomLoader;
