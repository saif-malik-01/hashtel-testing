"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import CartButton from "./cart-button";
import SearchBar from "./search-bar";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  channel: string;
  LINKS: { title: string; path: string; isMenu?: boolean }[];
  categories: { name: string; slug: string }[];
  verified: boolean;
  initialCartItems: number;
}

export default function MobileNav({
  channel,
  LINKS,
  categories,
  verified,
  initialCartItems,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-2xl">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px] p-6">
          <div className="flex flex-col gap-6">
            <SearchBar channel={channel} />

            <nav className="flex flex-col gap-4">
              {LINKS.map((item) =>
                item.isMenu ? (
                  <div key={item.title}>
                    <button
                      className={cn(
                        "text-left text-sm font-medium",
                        showCategories && "text-primary"
                      )}
                      onClick={() => setShowCategories(!showCategories)}
                    >
                      {item.title}
                    </button>
                    {showCategories && (
                      <div className="pl-4 py-4 flex flex-col gap-2">
                        {categories.map((category) => (
                          <SheetClose asChild key={category.slug}>
                            <Link
                              href={`/${channel}/shop/${category.slug}`}
                              className="text-sm hover:underline"
                              onClick={() => setIsOpen(false)}
                            >
                              {category.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <SheetClose asChild key={item.path}>
                    <Link
                      href={item.path}
                      className="text-sm font-medium hover:underline"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                )
              )}
            </nav>

            <div className="flex flex-col gap-4 mt-4">
              <SheetClose asChild>
                <Link
                  href={
                    verified ? `/${channel}/account` : `/${channel}/sign-in`
                  }
                  className="text-sm font-medium hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
              </SheetClose>
              <CartButton
                channel={channel}
                initialCartItems={initialCartItems}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
