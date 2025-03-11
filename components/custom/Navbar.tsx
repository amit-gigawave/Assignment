"use client";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
// import { useState } from "react";

export function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // const unsubscribe = auth.onAuthStateChanged((user) => {
  //   //   setIsLoggedIn(!!user);
  //   // });

  //   // return () => unsubscribe();
  //   const accessToken=getAcc
  // }, []);

  const navItems = [
    { name: "Home", url: "/", icon: "/icons/home.svg" },
    { name: "Causes", url: "/causes", icon: "/icons/logo.svg" },
    {
      name: "Account",
      url: "profile",
      icon: "/icons/profile.svg",
    },
    // {
    //   name: "Join as volunteer",
    //   url: "/join-as-volunteer",
    //   icon: "/icons/contact-us.svg",
    // },
  ];

  const navMobileItem = [
    { name: "Home", url: "/", icon: "/icons/home.svg" },
    { name: "Causes", url: "/causes", icon: "/icons/logo.svg" },
    { name: "Profile", url: "/profile", icon: "/icons/profile.svg" },
  ];

  return <NavBar items={isMobile ? navMobileItem : navItems} />;
}
