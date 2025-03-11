"use client";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Facilities from "../components/Facilities";
import { LatestCauses } from "../components/LatestCouses";
import {
  useGetAllCauses,
  useGetCategoriesQuery,
} from "@/services/query/causeQuery";
import CustomLoader from "@/components/custom/CustomLoader";
import { useCauseStore } from "@/stores/causeStore";

export const runtime = "edge";

const Page = () => {
  const { data: causes, isPending: isCausePending } = useGetAllCauses();
  const { data, isPending } = useGetCategoriesQuery();

  const { filteredCauses, setCauses } = useCauseStore();

  useEffect(() => {
    if (causes) {
      setCauses(causes);
    }
  }, [causes]);

  return (
    <section>
      <Hero />
      {isPending || isCausePending ? (
        <CustomLoader />
      ) : (
        <>
          <Facilities data={data!} />
          <LatestCauses causes={filteredCauses} />
        </>
      )}
    </section>
  );
};

export default Page;
