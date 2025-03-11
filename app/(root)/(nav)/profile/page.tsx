"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Edit, HandCoins, Heart, LogOut } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/firebase"; // Add this import
import { signOut } from "firebase/auth"; // Add this import
import { useRouter } from "next/navigation";
import React from "react";
import { getCookieList } from "@/lib/serverCom";
import { useGetUserQuery } from "@/services/query/userQuery";
import CustomLoader from "@/components/custom/CustomLoader";

export const runtime = "edge";

const links = [
  {
    title: "Donations",
    url: "/profile/donations",
    icon: <Heart className="text-red-600" />,
    bg: "bg-red-100",
  },
  {
    title: "Donation Requests",
    url: "/profile/donation-request",
    icon: <HandCoins className="text-green-600" />,
    bg: "bg-green-100",
  },
];
const Profile = () => {
  const { data: profileDetails, isPending } = useGetUserQuery();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear cookies
      const cookieList = await getCookieList();
      Object.keys(cookieList).forEach((cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      });
      router.push("/login"); // Redirect to login page
      router.refresh(); // Refresh the page to clear state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <section className="py-10 px-4 md:pt-28  min h-screen">
      {isPending && <CustomLoader />}
      {profileDetails && (
        <div className="max-w-screen-md mx-auto space-y-5">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight text-left text-secondary-foreground">
            Profile Information
          </h3>
          <Card className="border-none  !mb-16">
            <CardContent className="w-full flex justify-between items-center p-5 py-6">
              <div className=" flex items-center overflow-hidden gap-4 rounded-lg">
                <div className="bg-slate-100 overflow-hidden rounded-full">
                  <Image
                    src={
                      profileDetails.image
                        ? profileDetails.image
                        : "/icons/profile.svg"
                    }
                    alt="avatar"
                    width={100}
                    height={100}
                    className="size-full font-bold"
                  />
                </div>
                <div className="flex items-start flex-col gap-1 ">
                  <h3 className="text-sm sm:text-xl text-start font-bold truncate">
                    {profileDetails.email}
                  </h3>
                  <p className="text-sm w-full italic text-muted-foreground truncate">
                    {profileDetails.phone}
                  </p>
                  <p className="text-sm w-full italic text-muted-foreground truncate">
                    {profileDetails.firstName} {profileDetails.lastName}
                  </p>
                </div>
              </div>
              <Button variant="ghost">
                <Edit />
              </Button>
            </CardContent>
          </Card>
          {/* <Card className="hover:animate-glow w-fit mx-auto">
          <CardHeader className="grid grid-cols-2 justify-between items-end p-2 pb-3">
            <div className="flex flex-col items-center border-r-2 ">
              <span className="text-xl font-bold text-primary">10</span>{" "}
              <span className="text-sm font-sans">Donations</span>
            </div>
            <div className="h-[50px] border-2" />
            <div className="flex flex-col items-center px-4">
              <span className="text-xl font-bold text-primary">5</span>{" "}
              <span className="text-sm font-sans">Donation Requests</span>
            </div>
          </CardHeader>
        </Card> */}
          {links.map((link) => (
            <Card
              key={link.title}
              className={cn([
                "shadow-none cursor-pointer  hover:bg-[mask-image:linear-gradient(to_right,white,white,white)] bg-white",
                // link.bg,
              ])}
              onClick={() => router.push(link.url)}
            >
              {/* <Link href={link.url}> */}
              <CardHeader className="flex flex-row items-center justify-between p-4 font-medium font-sans cursor-pointer">
                <div className="flex gap-4">
                  {link.icon}
                  {link.title}
                </div>

                <ArrowRight className="text-primary size-6" />
              </CardHeader>
              {/* </Link> */}
              {/* <CardFooter>
              <a href={link.url} className="text-primary">
                View All
              </a>
            </CardFooter> */}
            </Card>
          ))}
          <Card
            className="shadow-none  cursor-pointer  bg-white"
            // onClick={() => redirect(link.url)}
            onClick={() => handleLogout()}
          >
            <CardHeader className="flex flex-row items-center justify-between p-4 font-medium font-sans cursor-pointer">
              <div className="flex gap-4">
                <LogOut className="text-gray-600" />
                Log Out
              </div>
              <ArrowRight className="text-primary size-6" />
            </CardHeader>
          </Card>
        </div>
      )}
    </section>
  );
};

export default Profile;
