"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPv4 = (function () {
    function IPv4(cidrIP) {
        this.cidrIP = cidrIP;
        var _a = cidrIP.match(/(.*)\/(\d{1,2})/), ipStr = _a[1], lengthStr = _a[2];
        this.ip = IPv4.ipStringToBinary(ipStr);
        this.length = Number.parseInt(lengthStr);
    }
    IPv4.ipStringToBinary = function (ip) {
        var regexMatch = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
        if (regexMatch == null) {
            throw new Error("Input is not a valid IPv4 string.");
        }
        var octs = [regexMatch[1], regexMatch[2], regexMatch[3], regexMatch[4]];
        var shift = 24;
        var binIp = 0;
        for (var _i = 0, octs_1 = octs; _i < octs_1.length; _i++) {
            var oct = octs_1[_i];
            var octet = Number.parseInt(oct);
            octet <<= shift;
            binIp |= octet;
            shift -= IPv4.OCTET_SIZE;
        }
        return binIp;
    };
    IPv4.binaryIpToString = function (ip) {
        var ipOctArray = [];
        for (var i = 4; i != 0; --i) {
            var octet = ip & 255;
            ipOctArray.push(octet.toString());
            ip >>>= IPv4.OCTET_SIZE;
        }
        return ipOctArray.reverse().join(".");
    };
    Object.defineProperty(IPv4.prototype, "networkPrefix", {
        get: function () {
            return this.ip & this.bitmask;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IPv4.prototype, "hostId", {
        get: function () {
            return this.ip & ~this.bitmask;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IPv4.prototype, "bitmask", {
        get: function () {
            return (-1 << (32 - this.length) >>> 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IPv4.prototype, "allZerosAddress", {
        get: function () {
            return this.networkPrefix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IPv4.prototype, "allOnesAddress", {
        get: function () {
            return this.networkPrefix | (-1 >>> this.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IPv4.prototype, "ipRange", {
        get: function () {
            var startAddress = this.allZerosAddress;
            var endAddress = this.allOnesAddress;
            var range = [startAddress, endAddress];
            return range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IPv4.prototype, "ipRangeString", {
        get: function () {
            var ipRange = this.ipRange;
            var startAddress = ipRange[0];
            var startAddressString = IPv4.binaryIpToString(startAddress);
            var endAddress = ipRange[1];
            var endAddressString = IPv4.binaryIpToString(endAddress);
            var range = [startAddressString, endAddressString];
            return range;
        },
        enumerable: true,
        configurable: true
    });
    IPv4.OCTET_SIZE = 8;
    return IPv4;
}());
exports.IPv4 = IPv4;
