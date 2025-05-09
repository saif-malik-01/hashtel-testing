import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { redirect } from "next/navigation";
import Order from "@/components/account/order";

export default async function Orders() {
  const { me } = await executeGraphQL(CurrentUserDocument, {
    withAuth: true,
    revalidate: 60,
  });
  if(!me) redirect("/")
  
  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl font-semibold">Orders History</h1>
      {!!me.orders?.edges.length && me.orders.edges.map((o) => (
        <Order key={o.node.id} {...o.node} />
      ))}
      {!me.orders?.edges.length && (
        <p className="mt-4 text-center text-gray-400">No orders found.</p>
      )}
    </div>
  );
}
