import { GoogleTagManager } from "@next/third-parties";

export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return <GoogleTagManager gtmId="GTM-N43PJ8S6" />;
}
