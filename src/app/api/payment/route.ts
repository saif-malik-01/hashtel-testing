import { NextResponse } from "next/server";
import ICICI from "icici-dev";

const merchantConfig = {
  bankId: process.env.BANK_ID as string,
  merchantId: process.env.MERCHANT_ID as string,
  terminalId: process.env.TERMINAL_ID as string,
  mcc: process.env.MCC as string,
  passCode: process.env.PASS_CODE as string,
  secureSecret: process.env.SECURE_SECRET as string,
  encryptionKey: process.env.ENCRYPTION_KEY as string,
};

export async function POST(request: Request) {
  try {
    const { amount, orderInfo, channel, email } = await request.json();

    if (!orderInfo || !channel || !email) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const icici = new ICICI();
    const res = await icici.initiate({
      encKey: merchantConfig.encryptionKey,
      saltKey: merchantConfig.secureSecret,
      returnURL: `${process.env.BASE_URL}/api/payment-callback?channel=${channel}`,
      bankId: merchantConfig.bankId,
      passCode: merchantConfig.passCode,
      mcc: merchantConfig.mcc,
      txnRefNo: `TXN${Date.now()}`,
      merchantId: merchantConfig.merchantId,
      terminalId: merchantConfig.terminalId,
      currency: "356",
      amount: `${amount}`,
      orderInfo,
      email,
      phone: "9389586440",
    });

    if (res.status) {
      const { gatewayURL, EncData, data } = res.data;

      const url = `${gatewayURL}?EncData=${encodeURIComponent(
        EncData
      )}&MerchantId=${encodeURIComponent(
        data.MerchantId
      )}&BankId=${encodeURIComponent(
        data.BankId
      )}&TerminalId=${encodeURIComponent(
        data.TerminalId
      )}&Version=${encodeURIComponent(data.Version)}`;

      return NextResponse.json({ url }, { status: 200 });
    } else {
      return NextResponse.json(res, { status: 400 });
    }
  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
