import Features from "@/components/features";
import RecentProducts from "@/components/home/recent-products";
import FeaturedProducts from "@/components/home/featured-products";
import CategoryListings from "@/components/home/category-listings";
import Categories from "@/components/home/categories";
import Hero from "@/components/home//hero";
import BestSellerProducts from "@/components/home/bestSellerProducts";
import { CHANNELS } from "@/constants/global";
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return CHANNELS.map((c) => ({ channel: c }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;

  if(!CHANNELS.includes(channel)) notFound()

  return (
    <>
      <Hero />
      <RecentProducts channel={channel} />
      <Categories channel={channel} />
      <CategoryListings />
      <BestSellerProducts channel={channel} />
      <FeaturedProducts channel={channel} />
      <Features />
    </>
  );
}
