// "use client";
// import CauseSearch from "@/components/custom/CauseSearch";
// import { Button } from "@/components/extendui/button";
// import { useRouter } from "next/navigation";
// import { ZeroFeesSection } from "./FeeCard";

// const Hero = () => {
//   const router = useRouter();
//   return (
//     <section className="min-h-screen pb-5 bg-gradient-to-r from-black text-center relative flex flex-col items-center sm:justify-center">
//       <div className="absolute top-0 left-0 bg-[url('/images/hero.jpg')] bg-no-repeat bg-center  bg-cover h-full w-full -z-10" />
//       <div className="absolute top-0 w-full h-full bg-black/50 -z-10" />

//       <ZeroFeesSection />

//       <div className=" px-5 py-5 space-y-8 w-full">
//         <div className="text-3xl md:text-6xl text-center !leading-[43px] md:!leading-[80px] text-white font-bold pb-5 md:tracking-wider">
//           Dāna is the act of giving or charity,
//           <br /> giving is a form of karma
//         </div>
//         <CauseSearch className="text-gray-400" />
//         <div className="text-center space-y-5 text-white/70 italic text-sm md:text-base  max-w-3xl mx-auto">
//           <p>
//             Giving is a way to purify our karma and to cultivate positive
//             qualities such as compassion, generosity, and detachment.
//           </p>
//         </div>
//       </div>
//       <Button
//         variant={"ringHover"}
//         className="rounded-full md:hidden bg-gradient-to-br from-green-400 to-primary"
//         size={"lg"}
//         onClick={() => router.push("/join-as-volunteer")}
//       >
//         Join as Volunteer
//       </Button>
//     </section>
//   );
// };

// export default Hero;

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HandHeart, Sparkles } from "lucide-react";
import CauseSearch from "@/components/custom/CauseSearch";
import { useRouter } from "next/navigation";
import { ZeroFeesSection } from "./FeeCard";

const Hero = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Layer with Subtle Animation */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat opacity-80 scale-105"></div>
        <div className="absolute inset-0 bg-black/70"></div>
        {/* <div className="absolute top-0 w-full h-full bg-black/50 -z-10" /> */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center">
        {/* Zero Fees Banner */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full mb-16"
            >
              <ZeroFeesSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-xs md:text-sm font-medium tracking-wider text-green-200 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" /> TRANSFORM LIVES THROUGH
              GIVING
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight text-shadow max-w-5xl">
            <span className="block">Dāna is the act of giving,</span>
            <span className="block bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              a form of positive karma
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Giving purifies our karma and cultivates compassion, generosity, and
            detachment from material possessions.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl mx-auto mb-12"
        >
          <CauseSearch className="text-white/50" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            onClick={() => router.push("/join-as-volunteer")}
            className="rounded-full px-8 py-6 bg-gradient-to-br !from-primary/50 to-primary text-white hover:text-white border-none transition-all duration-300 ease-out hover:scale-105  group"
            size="lg"
          >
            <HandHeart className="mr-2 h-5 w-5 group-hover:animate-float" />
            Join as Volunteer
          </Button>

          {/* <Button
            variant="outline"
            onClick={() => router.push("/learn-more")}
            className="rounded-full px-8 py-6 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 transition-all duration-300"
            size="lg"
          >
            Learn More
          </Button> */}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
      />
    </section>
  );
};

export default Hero;
