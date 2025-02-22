import admin from "firebase-admin";

const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRw3Z4BS0WB5dI\nTylBX3IZKk/+dXuiD1+F+CEL0gJKryweX06632gsncQVjOtVCeenp2XBY04KWg7T\ni01kXq8+EhxE83BGIAHPelF9bTjmNNY2DmCGetpfp1O2XRgj6IfRnaOXa3OOw/bu\ny2gniNm1B1fLTu5FdlKSMXXpFzomGVwmVKcXXwVd3NUoeFdpjew14FAnFrBeOUf2\nRZcir9NuUKYhMwwn+iUMm8E1Jnceerp4Luk8+31sLpdTWQbOICvKkgCMeaLA6YPq\nORhTobL0ziSQaBhkFKpR0dJBg4mYTqferd7i3wG1kOvSq3vsAT9Hmbf376RktDXj\nd/3Sqoi/AgMBAAECggEANAW7dGGoQF3qlYrYaveeZwJY6308h8EzShjzLSjM27Pd\nB71QW8U7Y1FPR5724FTACJLaCB+2Q5f5NFrIe1uGL6kzLKCJWELo4Alwe2Biq6kv\n9SEUrFV8ohtwBfrJmWI6iPCFGXETLDWKoMd+kct9Xsmu6uOs8To6mTo+CWxyxe6y\nFQBni9itf1t3JLFK0JvJU3YW1BPUvlsmVD55C67Pc2L5zaBGVm8DndktZgngI5ev\nU3D2LYHx/EEiKIw01aXz0owUipu3o/XNT7kDnjoj2dGbzg3fDR6ZhC32EG03Qxsn\nwHfwHEs8VZbzfSBBctz/gbNFkmKl7M5dHCOOtYrrHQKBgQDcGPbDaEfTwmJ9xeBa\nSXcdjhVsCLsZ8rsHj5n79M3BX46T6r5fryfkKGWd45H3kk7auh/2409t4D8pqges\nxzxXjq6yrv0+jkV9Za7WXIc7se6PI8j92sUWj5zpDGBhmi39qSki7eQvvIMUYhPH\nHC7/m5DiuZXXHPBjtGmifBnTAwKBgQDz+vZqgP5NeiqQttwR6uHpDqLvfN+sd7OS\nYkNpkBblPJPLFwZFgAWHPjZ7B5B6pEvFGz3NanvZRHU0yqHSlUsM00hlpTihB/lB\nOCMqZBGe6eROj3l3XqP3Sgn4rSC0PM7N27bb2RSL6ufZqM9b/j0cFq8vW3hMOMoh\nYoqrbXjolQKBgH7VC+5TO4D19VfRHZYp27B2XjXhWiB71fdncy7URXV3oWvvzEDL\naMt71AMGTulBsJsuwpi9KNqCbSOPTdjs/wLdwCJL4LeZuMWoQPZaX7uwr25hCsPu\nu8BiheNuNGRKOtKAFqqAOAyiL08hrZAB17uIZBejJovNq2FpZ64woZkNAoGBAIIe\nbh0O/pFDfj//xg6oPiOVcsBW0NOiY1rGnT1HY26OiCPf+7BFPq2KOHQU7LD7vo04\nohVTnQmawQeOqg8tIAGPDSVooHMBVaW60sZg6CTgiKp9SkKnbrsL+ZVuf+qgI4sW\nisdlVtfoSA6FQVHGncDFOFkBZ37/Ko3ziBE1KS6hAoGBAK6BPskV2Rt4FHD4GwKb\nJ+RWh1xg73S4anmyhOomc6Lb4NP3XvH2/QI5ScIzbMpDbLQMQjpXMJHXRzW6bSL7\nEgceTV9Q3WRLXclcdBJ3TCDUxO9jWZYLOL+GoyL4p9k06XtIAbvyLn0jgfbg2FfC\nbamRzn2rw4wgWTGCJU3dpkkc\n-----END PRIVATE KEY-----\n";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      privateKey: PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.CLIENT_EMAIL,
    }),
    storageBucket: "hashtel-ecom.appspot.com",
  });
}

export default admin;
