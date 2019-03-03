const crypto = require("crypto");
const bitArray = require("node-bitarray");
const entropy = process.argv[2].toString();

// byte entropy
const byteEntropy = Buffer.from(entropy.match(/(.{2})/g).reverse().join(""));
console.log(byteEntropy);

// make checksum
const hashedEntropy = crypto.createHash("sha256").update(entropy).digest("hex");
const byteHashedEntropy = Buffer.from(hashedEntropy.match(/(.{2})/g).reverse().join(""));
const checksumLength = Math.floor(byteEntropy.length / 32);
console.log("mnemonicLength: " + checksumLength);
const checksum = byteHashedEntropy.slice(0, checksumLength);
console.log("checksum: ");
console.log(checksum);

// concat entropy + checksum
const mnemonicCode = Buffer.concat([byteEntropy, checksum]);
console.log(mnemonicCode);


console.log(mnemonicCode.readUIntBE(0, 6).toString(16));