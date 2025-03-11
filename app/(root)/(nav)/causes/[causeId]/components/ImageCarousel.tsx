import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "@/components/custom/CustomImageCarousel";
import Image from "next/image";

const ImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel
      carouselOptions={{
        loop: true,
      }}
      className="w-full "
    >
      <CarouselNext className="top-1/3 " />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="w-full aspect-video">
        {images.map((imageUrl, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <div className="outline outline-1 outline-border w-full aspect-video flex items-center justify-center rounded-xl bg-background">
              <Image
                src={imageUrl}
                alt={"Image"}
                width={1000}
                height={1000}
                className="rounded-xl size-full "
              />
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {images.map((imageUrl, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <div className="outline outline-1 outline-border size-full overflow-hidden flex items-center justify-center rounded-xl bg-background aspect-square">
              <Image
                src={imageUrl}
                alt={"Image"}
                width={1000}
                height={1000}
                className="rounded-xl w-full h-full"
              />
            </div>{" "}
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default ImageCarousel;
