/**
 * アドレスを短く表示するためのメソッド
 * @param address 
 * @param digits 
 * @returns 
 */
export const shortenAddress = (
  address: string, 
  digits = 4
): string => {
  if (!address) return "";
  const len = address.length;
  const start = address.startsWith("0x") ? "0x" : "";
  if (len <= (digits * 2) + start.length) {
    return address;
  }
  return `${start + address.slice(start.length, start.length + digits)}...${
    address.slice(len - digits)
  }`;
};
