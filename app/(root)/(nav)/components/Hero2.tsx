import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function Hero2() {
  const cards = [
    {
      title:
        "Giving to an individual in distress or need: This could involve donating money, food, clothing, or other resources to someone who is struggling.",
    },
    {
      title:
        "Philanthropic public projects: This could involve supporting organizations that are working to improve the lives of others, such as building schools, hospitals, or community centers.",
    },
  ];
  return (
    <section className=" mx-auto px-10 md:px-16 py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="relative aspect-[3/3] w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/hero.jpeg"
            alt="Transformative actions background"
            fill
            className="rounded-3xl"
            priority
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Transforming Daana karma to good Aura:
          </h1>

          <p className="text-muted-foreground text-base">
            Dāna can take many forms, such as:
          </p>
          <div className="space-y-4">
            {cards.map((card, index) => (
              <Card
                key={card.title}
                className=" relative  !border-none !shadow-none !bg-transparent"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{card.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground text-base">
            The act of dāna is considered to be a virtuous one, as it helps to
            cultivate generosity, compassion, and non-attachment. It is also
            believed to have positive karmic consequences, both for the giver
            and the receiver.
          </p>
        </div>
      </div>
    </section>
  );
}
