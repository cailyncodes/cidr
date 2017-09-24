const assert = require('assert');
const IPv4 = require('../index.js').IPv4;

let test1;

// ipStringToBinary tests
// positive tests
assert(IPv4.ipStringToBinary("0.0.0.0") === 0);
assert(IPv4.ipStringToBinary("0.0.0.1") === 1);
assert(IPv4.ipStringToBinary("0.0.0.5") === 5);
assert(IPv4.ipStringToBinary("0.0.0.13") === 13);
assert(IPv4.ipStringToBinary("0.0.0.209") === 209);
assert(IPv4.ipStringToBinary("0.0.1.0") === 256);
assert(IPv4.ipStringToBinary("0.0.10.13") === 2573);
assert(IPv4.ipStringToBinary("0.1.0.0") === 65536);

// negative tests
assert(IPv4.ipStringToBinary("0.0.0.13") !== null);
assert(IPv4.ipStringToBinary("0.0.0.13") !== 31);

// binaryIpToString tests
// positive tests
assert(IPv4.binaryIpToString(0) === "0.0.0.0");
assert(IPv4.binaryIpToString(1) === "0.0.0.1");
assert(IPv4.binaryIpToString(5) === "0.0.0.5");
assert(IPv4.binaryIpToString(13) === "0.0.0.13");
assert(IPv4.binaryIpToString(209) === "0.0.0.209");
assert(IPv4.binaryIpToString(256) === "0.0.1.0");
assert(IPv4.binaryIpToString(2573) === "0.0.10.13");
assert(IPv4.binaryIpToString(65536) === "0.1.0.0");

// negative tests
assert(IPv4.binaryIpToString(31) !== null);
assert(IPv4.binaryIpToString(31) !== "0.0.0.13");

// constructor tests
// positive test
test1 = new IPv4("0.0.0.0/10");
assert(test1.length === 10);
test1 = new IPv4("0.0.0.0/6");
assert(test1.length === 6);
// negative tests
test1 = new IPv4("0.0.0.0/19");
assert(test1.length !== 10);
test1 = new IPv4("0.0.0.0/31");
assert(test1.length !== 6);

// bitmast tests
// positive tests
test1 = new IPv4("0.0.0.0/10");
assert(test1.bitmask === 0b11111111110000000000000000000000);
test1 = new IPv4("0.0.0.0/6");
assert(test1.bitmask === 0b11111100000000000000000000000000);
// negative tests
test1 = new IPv4("0.0.0.0/19");
assert(test1.bitmask !== 0b11111111110000000000000000000000);
test1 = new IPv4("0.0.0.0/31");
assert(test1.bitmask !== 0b11111100000000000000000000000000);

// network prefix tests
// positive tests
test1 = new IPv4("1.1.1.1/16");
assert(test1.networkPrefix === 0b00000001000000010000000000000000);
test1 = new IPv4("1.1.1.1/17");
assert(test1.networkPrefix === 0b00000001000000010000000000000000);
test1 = new IPv4("1.1.1.1/6");
assert(test1.networkPrefix === 0b00000000000000000000000000000000);
test1 = new IPv4("10.10.10.10/12");
assert(test1.networkPrefix === 0b00001010000000000000000000000000);
test1 = new IPv4("10.255.10.10/12");
assert(test1.networkPrefix === 0b00001010111100000000000000000000);
// negative tests
test1 = new IPv4("255.14.15.13/19");
assert(test1.networkPrefix !== 0b00000001000000010000000000000000);
test1 = new IPv4("192.168.0.1/31");
assert(test1.networkPrefix !== 0b00001010000000000000000000000000);

// allZerosAddress tests
// positive tests
test1 = new IPv4("1.1.1.1/16");
assert(test1.allZerosAddress === 0b00000001000000010000000000000000);
test1 = new IPv4("1.1.1.1/17");
assert(test1.allZerosAddress === 0b00000001000000010000000000000000);
test1 = new IPv4("1.1.150.1/17");
assert(test1.allZerosAddress === 0b00000001000000011000000000000000);
// negative tests
test1 = new IPv4("255.14.15.13/19");
assert(test1.allZerosAddress !== 0b00000001000000010000000000000000);
test1 = new IPv4("192.168.0.1/31");
assert(test1.allZerosAddress !== 0b00001010000000000000000000000000);

// allOnesAddress tests
// positive tests
test1 = new IPv4("1.1.1.1/16");
assert(test1.allOnesAddress === 0b00000001000000011111111111111111);
test1 = new IPv4("1.1.1.1/17");
assert(test1.allOnesAddress === 0b00000001000000010111111111111111);
test1 = new IPv4("1.1.150.1/17");
assert(test1.allOnesAddress === 0b00000001000000011111111111111111);
// negative tests
test1 = new IPv4("255.14.15.13/19");
assert(test1.allOnesAddress !== 0b00000001000000011111111111111111);
test1 = new IPv4("192.168.0.1/31");
assert(test1.allOnesAddress !== 0b00000001000000011111111111111111);

// ipRange tests
// positive tests
test1 = new IPv4("1.1.1.1/16");
assert(test1.ipRange[0] === 0b00000001000000010000000000000000);
assert(test1.ipRange[1] === 0b00000001000000011111111111111111);
test1 = new IPv4("1.1.1.1/17");
assert(test1.ipRange[0] === 0b00000001000000010000000000000000);
assert(test1.ipRange[1] === 0b00000001000000010111111111111111);
test1 = new IPv4("1.1.150.1/17");
assert(test1.ipRange[0] === 0b00000001000000011000000000000000);
assert(test1.ipRange[1] === 0b00000001000000011111111111111111);
test1 = new IPv4("11.255.16.57/22");
assert(test1.ipRange[0] === 0b00001011111111110001000000000000);
assert(test1.ipRange[1] === 0b00001011111111110001001111111111);
// negative tests
test1 = new IPv4("255.14.15.13/19");
assert(test1.ipRange[0] !== 0b00000001000000010000000000000000);
assert(test1.ipRange[1] !== 0b00000001000000011111111111111111);
test1 = new IPv4("192.168.0.1/31");
assert(test1.ipRange[0] !== 0b00000001000000011000000000000000);
assert(test1.ipRange[1] !== 0b00000001000000011111111111111111);

// ipRangeString tests
// positive tests
test1 = new IPv4("1.1.1.1/16");
assert(test1.ipRangeString[0] === "1.1.0.0");
assert(test1.ipRangeString[1] === "1.1.255.255");
test1 = new IPv4("1.1.1.1/17");
assert(test1.ipRangeString[0] === "1.1.0.0");
assert(test1.ipRangeString[1] === "1.1.127.255");
test1 = new IPv4("1.1.150.1/17");
assert(test1.ipRangeString[0] === "1.1.128.0");
assert(test1.ipRangeString[1] === "1.1.255.255");
test1 = new IPv4("11.255.16.57/22");
assert(test1.ipRangeString[0] === "11.255.16.0");
assert(test1.ipRangeString[1] === "11.255.19.255");
// negative tests
test1 = new IPv4("255.14.15.13/19");
assert(test1.ipRangeString[0] !== "1.1.0.0");
assert(test1.ipRangeString[1] !== null);
test1 = new IPv4("192.168.0.1/31");
assert(test1.ipRangeString[0] !== "1.1.0.0");
assert(test1.ipRangeString[1] !== null);

console.log("All tests passed");
