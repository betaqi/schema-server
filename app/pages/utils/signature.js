import CryptoJS from "crypto-js";


export function getSignature(timestamp) {
  const singKey = "SDshA8cyfOEntry9zj63y";
  console.log(CryptoJS.enc.Utf8.parse(timestamp))
  const hash = CryptoJS.HmacSHA256(
    CryptoJS.enc.Utf8.parse(timestamp),
    CryptoJS.enc.Utf8.parse(singKey)
  );

  return hash.toString(CryptoJS.enc.Hex);
}