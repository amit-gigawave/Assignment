"use client";
import CustomHeader from "@/components/custom/CustomHeader";

import { useSearchParams } from "next/navigation";
import React from "react";

import {
  useGetCategoriesQuery,
  useGetCauseByID,
} from "@/services/query/causeQuery";
import CauseForm from "./components/CauseForm";
import CustomLoader from "@/components/custom/CustomLoader";

export const runtime = "edge";

const Page = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const { isPending } = useGetCategoriesQuery();
  const { data: causeData, isPending: isCausePending } = useGetCauseByID(
    id as string
  );

  return (
    <section className="p-3 bg-gradient-to-br from-orange-50 to-teal-100/20 h-fit min-h-screen">
      <CustomHeader title="Raise a Donation Request" className="" />
      {(isPending || isCausePending) && <CustomLoader />}
      {!isPending && (
        <CauseForm
          key={JSON.stringify(causeData)}
          causeData={id ? causeData : null}
        />
      )}
    </section>
  );
};

export default Page;
