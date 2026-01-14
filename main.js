import { PublicKey } from "https://esm.sh/@solana/web3.js@1.95.3";
import { encodeURL, createQR } from "https://esm.sh/@solana/pay@0.2.5";
import BigNumber from "https://esm.sh/bignumber.js@9.1.2";

const connectBtn = document.getElementById("connect");
const walletText = document.getElementById("wallet");
const generateBtn = document.getElementById("generate");
const amountInput = document.getElementById("amount");
const qrContainer = document.getElementById("qr");

let receiverPublicKey = null;

// Connect wallet (receiver)
connectBtn.onclick = async () => {
  const provider = window.phantom?.solana;
  if (!provider) {
    alert("Phantom not found");
    return;
  }

  const res = await provider.connect();
  receiverPublicKey = new PublicKey(res.publicKey.toString());
  walletText.innerText = `Receiver: ${receiverPublicKey.toBase58()}`;
};

// Generate QR
generateBtn.onclick = () => {
  if (!receiverPublicKey) {
    alert("Connect wallet first");
    return;
  }

  const amount = amountInput.value;
  if (!amount || Number(amount) <= 0) {
    alert("Invalid amount");
    return;
  }

  const url = encodeURL({
    recipient: receiverPublicKey,
    amount: new BigNumber(amount), 
    label: "Solana Pay Demo",
    message: "Pay via Phantom",
    cluster: "devnet",
  });

  qrContainer.innerHTML = "";
  const qr = createQR(url, 300);
  qr.append(qrContainer);
};
