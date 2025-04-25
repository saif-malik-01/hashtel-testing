import { ConfirmUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { redirect } from "next/navigation";

export default async function AccountConfirmation({
  searchParams,
  params,
}: {
  params: Promise<{ channel: string }>;
  searchParams: Promise<{
    email: string;
    token: string;
    redirect: string;
  }>;
}) {
  const { email, token, redirect: redirectUrl } = await searchParams;
  const { channel } = await params;

  const data = await executeGraphQL(ConfirmUserDocument, {
    variables: {
      email,
      token,
    },
  });

  if (data.confirmAccount?.user?.isConfirmed) {
    redirect(`/${channel}/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ""}`);
  }

  redirect(`/${channel}/sign-up`);
}
