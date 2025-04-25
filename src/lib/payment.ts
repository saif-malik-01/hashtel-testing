import CryptoJS from 'crypto-js';

// Interface for generic parameters
interface PaymentParams {
  [key: string]: string | number;
}

// SHA-256 Signature Generation
export function generateSHA256Hash(params: PaymentParams, secureSecret: string): string {
  const sortedKeys = Object.keys(params).sort();
  let hashString = secureSecret;
  sortedKeys.forEach((key) => {
    hashString += params[key].toString();
  });
  return CryptoJS.SHA256(hashString).toString(CryptoJS.enc.Hex).toUpperCase();
}

// AES-256 Encryption
export function encryptAES256(data: string, key: string): string {
  const iv = CryptoJS.lib.WordArray.random(16); // 16 bytes IV
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

export function generateEncData(params: PaymentParams, encryptionKey: string): string {
  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}||${value}`)
    .join('::');
  return encryptAES256(paramString, encryptionKey);
}