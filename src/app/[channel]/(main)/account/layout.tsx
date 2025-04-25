import React from "react";
import SiderNav from "@/components/account/sidenav";
import { executeGraphQL } from "@/lib/graphql";
import { CurrentUserDocument } from "@/gql/graphql";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me } = await executeGraphQL(CurrentUserDocument, { withAuth: true });
  if (!me) redirect("/");

  return (
    <section className="my-12 md:px-16 flex md:flex-row flex-col w-full gap-12">
      <SiderNav />
      <div className="w-full">{children}</div>
    </section>
  );
}
