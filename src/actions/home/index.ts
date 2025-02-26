"use server";

import admin from "@/lib/firebase-admin";

export const getBanners = async () => {
  try {
    const db = admin.firestore();
    const bannersRef = db.collection("banners");
    const snapshot = await bannersRef.get();

    if (snapshot.empty) {
      console.log("No banners found in Firestore.");
      return [];
    }

    const fileList = snapshot.docs.map((doc) => {
      const data = doc.data();
      const bannerUrl = data.bannerUrl || "";
      const link = data.link || "";
      let type = bannerUrl.includes(".mp4") ? "video" : "image";
      if(type !== "video") type = bannerUrl.includes(".webm") ? "video" : "image";
      if(type !== "video") type = bannerUrl.includes(".ogg") ? "video" : "image";

      return { bannerUrl, link, type };
    });

    return fileList;
  } catch (error) {
    console.error("Error fetching banners from Firestore:", error);
    return [];
  }
};
