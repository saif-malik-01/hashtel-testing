// app/components/Navbar.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import CartButton from "./cart-button";
import SearchBar from "./search-bar";
import MobileNav from "./mobile-nav";
import { LINKS } from "@/constants/navbar";
import { executeGraphQL } from "@/lib/graphql";
import {
  CurrentUserDocument,
  ProductCategoryListDocument,
} from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";

export default async function Navbar({ channel }: { channel: string }) {
  const data = await executeGraphQL(ProductCategoryListDocument, {
    revalidate: 60,
  });
  const { me } = await executeGraphQL(CurrentUserDocument, { withAuth: true });
  const checkoutId = await Checkout.getIdFromCookies(channel);
  const checkout = await Checkout.find(checkoutId);
  const initialCartItems = checkout?.lines.length || 0;

  const categories = data.categories?.edges.map((e) => e.node) || [];

  return (
    <nav className="bg-white w-full border-b border-gray-100 md:px-32 px-6 py-4">
      <div className="w-full flex items-center justify-between">
        <Link href={`/${channel}`}>
          <Image
            src="/hashtel-logo.png"
            width={60}
            height={66}
            alt="Hashtel Logo"
          />
        </Link>

        <MobileNav
          channel={channel}
          LINKS={LINKS}
          categories={categories}
          verified={!!me}
          initialCartItems={initialCartItems}
        />

        <div className="hidden md:flex flex-1 justify-center items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {LINKS.map((item) =>
                item.isMenu ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-2 p-2">
                      {categories.map((category) => (
                        <NavigationMenuLink
                          key={category.slug}
                          className={navigationMenuTriggerStyle()}
                          href={`/${channel}/shop/${category.slug}`}
                        >
                          {category.name}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink
                      href={item.path}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <SearchBar channel={channel} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={me ? `/${channel}/account` : `/${channel}/sign-in`}>
                  <Image
                    src="/icons/account.png"
                    alt="Account"
                    height={20}
                    width={20}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CartButton channel={channel} initialCartItems={initialCartItems} />
        </div>
      </div>
    </nav>
  );
}
