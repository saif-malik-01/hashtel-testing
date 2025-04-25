"use client";

import React, { useState } from "react";
import NavLinks from "./nav-links";
import { Button } from "@/components/ui/button";
import { onLogout } from "@/actions/auth";
import { useParams, useRouter } from "next/navigation";

export default function SiderNav() {
  const router = useRouter();
  const { channel } = useParams();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await onLogout();
    router.replace(`/${channel}`);
    setLoading(false);
  };

  return (
    <div className="md:w-[300px] h-fit p-4 py-8 space-y-3 bg-gray-100 rounded-xl">
      <h3 className="pl-4 font-semibold text-2xl mb-4">My Account</h3>
      <NavLinks />
      <Button onClick={handleLogout} variant="link" className="text-black">
        {loading ? "Logging out" : "Log Out"}
      </Button>
    </div>
  );
}
