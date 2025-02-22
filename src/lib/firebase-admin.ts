import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.CLIENT_EMAIL,
    }),
    storageBucket: "hashtel-ecom.appspot.com",
  });
}

export default admin;
