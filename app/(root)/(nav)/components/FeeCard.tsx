// // components/ZeroFeesSection.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Card } from "@/components/ui/card";
// import { TextAnimate } from "@/components/magicui/text-animate";

// export function ZeroFeesSection() {
//   return (
//     <section className="p-4 rounded-xl mx-4 px-4 ">
//       <div className="max-w-lg mx-auto">
//         <div className="">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//           >
//             <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-none">
//               <div className="flex flex-col items-center text-center">
//                 <TextAnimate
//                   variants={{
//                     hidden: {
//                       opacity: 0,
//                       y: 30,
//                       rotate: 45,
//                       scale: 0.5,
//                     },
//                     show: (i) => ({
//                       opacity: 1,
//                       y: 0,
//                       rotate: 0,
//                       scale: 1,
//                       transition: {
//                         delay: i * 0.1,
//                         duration: 0.4,
//                         y: {
//                           type: "spring",
//                           damping: 12,
//                           stiffness: 200,
//                           mass: 0.8,
//                         },
//                         rotate: {
//                           type: "spring",
//                           damping: 8,
//                           stiffness: 150,
//                         },
//                         scale: {
//                           type: "spring",
//                           damping: 10,
//                           stiffness: 300,
//                         },
//                       },
//                     }),
//                     exit: (i) => ({
//                       opacity: 0,
//                       y: 30,
//                       rotate: 45,
//                       scale: 0.5,
//                       transition: {
//                         delay: i * 0.1,
//                         duration: 0.4,
//                       },
//                     }),
//                   }}
//                   by="character"
//                   className="text-xl md:text-2xl font-bold mb-2 text-green-200"
//                 >
//                   ZERO Platform & Transaction Fee.
//                 </TextAnimate>
//                 <p className="text-sm md:text-base text-white/50">
//                   We charge absolutely nothing for using our platform. No hidden
//                   charges. Payments processed at cost with no markup.
//                 </p>
//               </div>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award, Leaf } from "lucide-react";

export const ZeroFeesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="glass-effect overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          {/* Main Text */}
          <div className="flex items-center mb-3 md:mb-0">
            <Award className="h-8 w-8 text-green-200 mr-3 flex-shrink-0" />
            <div>
              <motion.h3
                className="text-lg md:text-xl font-bold text-white tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                  ZERO
                </span>{" "}
                Platform & Transaction Fees
              </motion.h3>
              <motion.p
                className="text-xs md:text-sm text-white/70 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                100% of your donation goes directly to the cause
              </motion.p>
            </div>
          </div>

          {/* Commitment Badge */}
          <motion.div
            className="flex items-center bg-chip-bg backdrop-blur-md rounded-full px-3 py-1 border border-white/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Leaf className="h-3.5 w-3.5 text-green-200 mr-1.5" />
            <span className="text-xs font-medium text-chip-text text-green-200">
              Our Commitment
            </span>
          </motion.div>
        </div>

        {/* Bottom Information */}
        <motion.div
          className="px-4 py-2 bg-black/30 border-t border-white/10 text-xs text-white/60 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>No hidden charges</span>
          <span>•</span>
          <span>Transparent giving</span>
        </motion.div>
      </Card>
    </motion.div>
  );
};
