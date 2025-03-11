import { Footer } from "@/components/custom/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <section>
      {children}
      <Footer />
    </section>
  );
}
