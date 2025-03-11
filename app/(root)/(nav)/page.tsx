"use client";
import CustomLoader from "@/components/custom/CustomLoader";
import { LatestCauses } from "./components/LatestCouses";
import { useMostDonatedCausesQuery } from "@/services/query/causeQuery";

export const runtime = "edge";

export default function Home() {
  const { data: causes, isPending } = useMostDonatedCausesQuery();
  return (
    <section className=" pt-20">
      {/* <Hero />
      <Hero2 /> */}
      {isPending && <CustomLoader />}
      {!!causes && <LatestCauses title="Latest Causes" causes={causes} />}
      {/* <OurGallery />
      <Stats /> */}
    </section>
  );
}
