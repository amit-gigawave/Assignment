"use client";
import CauseSearch from "@/components/custom/CauseSearch";
import CuisineSelector from "@/components/custom/cuisine-selector";
import { useCauseStore } from "@/stores/causeStore";
import React from "react";

const Facilities = ({ data }: { data: { name: string; id: string }[] }) => {
  const { setCategory } = useCauseStore();

  return (
    <section className="flex flex-col items-center mt-8">
      <CauseSearch />

      <CuisineSelector
        cuisines={data!.map((category) => category.name)}
        title="Choose Cause Categories"
        onSelect={(cuisine) => {
          console.log(cuisine);
          setCategory(cuisine);
        }}
      />
    </section>
  );
};

export default Facilities;
