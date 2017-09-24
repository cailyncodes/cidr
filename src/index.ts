export class IPv4 {
  private ip: number;
  private length: number;
  static OCTET_SIZE: number = 8;

  constructor(protected cidrIP: string) {
    let [, ipStr, lengthStr]: Array<string> = cidrIP.match(/(.*)\/(\d{1,2})/);
    this.ip = IPv4.ipStringToBinary(ipStr);
    this.length = Number.parseInt(lengthStr);
  }

  static ipStringToBinary(ip: string): number {
    let regexMatch: RegExpMatchArray = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (regexMatch == null) {
      throw new Error("Input is not a valid IPv4 string.");
    }
    let octs: Array<string> = [regexMatch[1], regexMatch[2], regexMatch[3], regexMatch[4]];
    let shift: number = 24;
    let binIp: number = 0;
    for (let oct of octs) {
      let octet: number = Number.parseInt(oct);
      octet <<= shift;
      binIp |= octet;
      shift -= IPv4.OCTET_SIZE;
    }
    return binIp;
  }

  static binaryIpToString(ip: number): string {
    let ipOctArray: Array<string> = [];
    for (let i: number = 4; i != 0; --i) {
      let octet: number = ip & 0b11111111;
      ipOctArray.push(octet.toString());
      ip >>>= IPv4.OCTET_SIZE;
    }
    return ipOctArray.reverse().join(".");
  }

  get networkPrefix(): number {
    return this.ip & this.bitmask;
  }

  get hostId(): number {
    return this.ip & ~this.bitmask;
  }

  get bitmask(): number {
    return (-1 << (32 - this.length) >>> 0);
  }

  get allZerosAddress(): number {
    return this.networkPrefix;
  }

  get allOnesAddress(): number {
    return this.networkPrefix | (-1 >>> this.length);
  }

  get ipRange(): Array<number> {
    let startAddress: number = this.allZerosAddress;
    let endAddress: number = this.allOnesAddress;
    let range: Array<number> = [startAddress, endAddress];
    return range;
  }

  get ipRangeString(): Array<string> {
    let ipRange: Array<number> = this.ipRange;
    let startAddress: number = ipRange[0];
    let startAddressString: string = IPv4.binaryIpToString(startAddress);
    let endAddress: number = ipRange[1];
    let endAddressString: string = IPv4.binaryIpToString(endAddress);
    let range: Array<string> = [startAddressString, endAddressString];
    return range;
  }
}
