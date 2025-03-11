"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Calendar, Search } from "lucide-react";
// import { causes } from "@/constants/response";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useGetAllCauses } from "@/services/query/causeQuery";
import { cn } from "@/lib/utils";
import { HoverButton } from "../ui/hover-button";

const CauseSearch = ({ className }: { className?: string }) => {
  const { data: causes } = useGetAllCauses();
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <HoverButton
          // variant={"glowingRing"}
          className={cn([
            "rounded-full w-96 max-w-[80%] mx-auto  flex items-center justify-start gap-5",
            className,
          ])}
        >
          <Search className="size-5" />
          Search Causes...
        </HoverButton>
        {/* <div
          className={cn([
            `relative w-96 max-w-[80%] mx-auto glass-effect rounded-full transition-all duration-300 `,
            className,
          ])}
        >
          <Input
            type="text"
            placeholder="Search for causes to support..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            className="py-6 px-6 pl-12 rounded-full bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />

          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/70 to-primary text-white hover:text-white transition-colors duration-300"
          >
            Search
          </Button>
        </div> */}
      </DialogTrigger>
      <DialogContent className="p-0 [&>button]:hidden max-w-[340px] rounded-xl sm:max-w-2xl">
        <DialogTitle className="hidden">Search Results</DialogTitle>
        <Command className="rounded-lg border ">
          <CommandInput placeholder="Search Cause..." />
          <CommandList className="max-h-[400px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions" className="">
              {causes
                ? causes.map((cause) => (
                    <CommandItem
                      key={cause.id}
                      value={cause.title}
                      className="p-0 focus:bg-orange-50 mb-3"
                      onSelect={() => {
                        router.push(`/causes/${cause.id}`);
                      }}
                    >
                      <div className="flex items-center gap-3 p-2 w-full cursor-pointer">
                        <Image
                          src={cause.images[0]}
                          alt={cause.title}
                          width={200}
                          height={200}
                          className=" size-11 rounded-xl"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium line-clamp-2">
                            {cause.title}
                          </h3>
                          {/* <div className="space-y-1"> */}
                          <div className="flex justify-between text-xs">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="size-2" />
                              <span>
                                {new Date(cause.deadline).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="font-medium flex items-center gap-1">
                              ₹{cause.fundRaised.toLocaleString()} / ₹
                              {cause.amount.toLocaleString()}
                            </span>
                          </div>
                          {/* <Progress
                          value={(cause.fundRaised / cause.amount) * 100}
                          className="h-1.5"
                        />
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Goal</span>
                          <span className="font-medium flex items-center gap-1">
                            ₹{cause.amount.toLocaleString()}
                          </span>
                        </div> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CauseSearch;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   // Placeholder data for suggestions
//   const suggestions = [
//     "Education",
//     "Healthcare",
//     "Environment",
//     "Disaster Relief",
//     "Animal Welfare",
//   ];

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Searching for:", searchTerm);
//     // Here you would typically handle the search logic
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full"
//     >
//       <div
//         className={`relative glass-effect rounded-full transition-all duration-300 ${
//           isFocused
//             ? "shadow-lg shadow-emerald-700/10 ring-2 ring-white/20"
//             : ""
//         }`}
//       >
//         <form onSubmit={handleSearch} className="flex items-center">
//           <Input
//             type="text"
//             placeholder="Search for causes to support..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             className="py-6 px-6 pl-12 rounded-full bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//           />
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />

//           <Button
//             type="submit"
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 transition-colors duration-300"
//           >
//             Search
//           </Button>
//         </form>
//       </div>

//       {/* Search Suggestions */}
//       {isFocused && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.2 }}
//           className="mt-2 flex flex-wrap gap-2 justify-center"
//         >
//           {suggestions.map((suggestion, index) => (
//             <motion.button
//               key={index}
//               className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
//               whileHover={{ scale: 1.05 }}
//               onClick={() => setSearchTerm(suggestion)}
//             >
//               {suggestion}
//             </motion.button>
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };
