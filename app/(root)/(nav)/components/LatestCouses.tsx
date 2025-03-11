"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CustomButton } from "@/components/custom/CustomButtons";
import SectionHeading from "@/components/custom/SectionHeading";
import { useRouter } from "next/navigation";
import { CauseSearchType } from "@/models/schema";

export function LatestCauses({
  title,
  causes,
}: {
  title?: string;
  causes: CauseSearchType[];
}) {
  const router = useRouter();

  return (
    <section className="py-12 md:py-16 px-10 md:px-16">
      {causes!.length === 0 && (
        <div className="h-32 text-center">No Causes Found.</div>
      )}
      <div className="max-w-screen-lg mx-auto">
        {title && (
          <div className="flex justify-between items-center mb-8">
            <SectionHeading>{title}</SectionHeading>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {causes?.map((cause) => (
            <Card
              key={cause.id}
              className="overflow-hidden shadow-none cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={cause.images[0] || "/placeholder.svg"}
                  alt={cause.title}
                  width={350}
                  height={350}
                  className="size-full"
                />
              </div>
              <CardContent className="p-5 mb-auto ">
                <ul className="gap-1 pb-2 flex">
                  <li className="text-xs text-primary font-bold mr-2 bg-primary/10 px-2 py-[2px] w-fit rounded-full">
                    {cause.categories[0]}
                  </li>
                  {cause.categories.length > 1 && (
                    <li className="text-xs text-primary font-bold mr-2 bg-primary/10 px-2 py-[2px] w-fit rounded-full">
                      {cause.categories.length}+
                    </li>
                  )}

                  {/* {cause.categories.map((category) => (
                  ))} */}
                </ul>
                <h3 className="text-xl font-bold  line-clamp-2">
                  {cause.title}
                </h3>

                <Progress
                  value={(cause.fundRaised / cause.amount) * 100}
                  className="h-2 my-4"
                />
                <div className="flex justify-between items-center text-sm">
                  <div className="space-y-1">
                    <p className="text-secondary-foreground font-bold">
                      Goal: ${cause.amount.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      Raised: {cause.fundRaised.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{cause.totalDonations ?? 0}</p>
                    <p className="text-muted-foreground">donations</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 ">
                <CustomButton
                  btnVariant="dark"
                  className="w-full font-bold h-10"
                  onClick={() => router.push(`/causes/${cause.id}`)}
                >
                  View Details
                </CustomButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {/* <CustomButton
        btnVariant="outlined"
        className="text-xs sm:text-sm md:text-base mt-10 mx-auto"
      >
        MORE CAUSES
      </CustomButton> */}
    </section>
  );
}
