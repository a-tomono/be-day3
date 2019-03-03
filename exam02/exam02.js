const crypto = require("crypto");
const bitwise = require("bitwise");
const fs = require("fs");
const entropy = process.argv[2].toString();
const filePath = process.argv[3].toString();

// load word file
const words = fs.readFileSync(filePath).toString().trim().split("\r\n");

// byte entropy
const byteEntropy = Buffer.from(entropy, "hex");

// make checksum
const hashedEntropy = crypto.createHash("sha256").update(entropy).digest("hex");
const byteHashedEntropy = Buffer.from(hashedEntropy, "hex");
const checksumLength = Math.floor(bitwise.buffer.read(byteEntropy, 0).length / 32);

const checksum = byteHashedEntropy.slice(0, checksumLength);
console.log("checksum: ");
console.log(checksum);

// concat entropy + checksum
const mnemonicCode = Buffer.concat([byteEntropy, checksum]);
const numberOfWords = Math.floor(bitwise.buffer.read(byteEntropy, 0).length + checksumLength) / 11;
console.log("number of words: " + numberOfWords);

let mnemonic = [];
for(var i=0; i<numberOfWords; i+=11){
    mnemonic.push(words[bitwise.buffer.readUInt(mnemonicCode,i,11)]);
}
console.log(mnemonic.join(" "));

console.log("----debug----");
console.log("length of entropy(byte): " + entropy.length);
console.log("length of hashedEntropy(byte): " + hashedEntropy.length);
console.log("bit length of byteEntropy(bit): " + bitwise.buffer.read(byteEntropy, 0).length);
console.log("bit length of checksumLength(bit): " + checksumLength);
console.log(bitwise.buffer.create(bitwise.buffer.read(byteHashedEntropy, 0).slice(0, checksumLength)));