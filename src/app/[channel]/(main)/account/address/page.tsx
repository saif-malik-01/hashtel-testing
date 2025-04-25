import { executeGraphQL } from "@/lib/graphql";
import AddressCard from "@/components/account/address-card";
import { CurrentUserDocument } from "@/gql/graphql";

export default async function Address() {
  const { me } = await executeGraphQL(CurrentUserDocument, {
    withAuth: true,
    revalidate: 60,
  });

  return <AddressCard defaultAddress={me?.defaultShippingAddress} />;
}
