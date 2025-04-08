"use server";

import CryptoJS from "crypto-js";
import axios from "axios";

// Load environment variables
const MCC = process.env.NEXT_PUBLIC_MCC;
const BANK_ID = process.env.NEXT_PUBLIC_BANK_ID;
const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID;
const TERMINAL_ID = process.env.NEXT_PUBLIC_TERMINAL_ID;
const PASS_CODE = process.env.NEXT_PUBLIC_PASS_CODE;
const SECURE_SECRET = process.env.NEXT_PUBLIC_SECURE_SECRET;
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const SALE_API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_UAT_SALE_API
    : process.env.NEXT_PUBLIC_PROD_SALE_API;

// Function to generate SHA-256 Secure Hash
function generateSecureHash(params) {
  const sortedKeys = Object.keys(params).sort();
  let hashString = SECURE_SECRET;
  sortedKeys.forEach((key) => {
    if (params[key]) hashString += params[key];
  });
  return CryptoJS.SHA256(hashString).toString(CryptoJS.enc.Hex);
}

// Function to encrypt data with AES-256
function encryptData(params) {
  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}||${value}`)
    .join("::");
  const encrypted = CryptoJS.AES.encrypt(
    paramString,
    ENCRYPTION_KEY
  ).toString();
  return encrypted;
}

// Server action to initiate payment
export async function initiatePayment(formData) {
  const amount = formData.get("amount"); // Amount in smallest currency unit (e.g., 10000 for Rs. 100.00)
  const orderInfo = formData.get("orderInfo"); // Unique order ID
  const returnUrl = formData.get("returnUrl"); // URL to redirect after payment

  // Required parameters for Sale Transaction API
  const paymentParams = {
    BankId: BANK_ID,
    MerchantId: MERCHANT_ID,
    TerminalId: TERMINAL_ID,
    TxnRefNo: `TXN${Date.now()}`, // Unique transaction reference number
    MCC: "5974", // Example MCC code
    PassCode: PASS_CODE,
    TxnType: "Pay",
    Currency: "356", // INR currency code
    Amount: amount,
    OrderInfo: orderInfo,
    ReturnURL: returnUrl,
  };

  // Generate Secure Hash
  const secureHash = generateSecureHash(paymentParams);
  paymentParams.SecureHash = secureHash;

  // Encrypt the request data
  const encData = encryptData(paymentParams);

  try {
    // Send request to ICICI Payment Gateway
    const response = await axios.post(
      SALE_API_URL,
      { EncData: encData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    // Handle response (Payment Gateway redirects user)
    return {
      success: true,
      html: response.data, // The HTML content of the payment page
    };
  } catch (error) {
    console.error("Payment initiation failed:", error);
    return {
      success: false,
      error: error.response?.data?.Message || "Payment initiation failed",
    };
  }
}
