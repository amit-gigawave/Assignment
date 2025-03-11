import SectionHeading from "@/components/custom/SectionHeading";
import Image from "next/image";
import React from "react";

const OurGallery = () => {
  return (
    <section className="py-12 md:py-16 px-10 md:px-16 space-y-10">
      <SectionHeading className="text-center">Our Gallery</SectionHeading>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((x) => (
          <Image
            key={x}
            src={`/images/hero.jpeg`}
            alt="gallery"
            width={500}
            height={500}
            className="aspect-square object-cover rounded-2xl"
          />
        ))}
      </div>
    </section>
  );
};

export default OurGallery;
