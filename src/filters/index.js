// import parseTime, formatTime and set to filter
export { formatTime, parseTime } from '@/utils';

export function subString(str, start, end) {
  let newStr = ''
  if(str) {
    newStr = str.substring(start, end);
  }
  return newStr;
}


export function byteToMega(byte, fixed = 2) {
  const toByte = 1024 * 1024;
  let result = '0KB';
  if (byte && !isNaN(Number(byte))) {
    result = (Number(byte) / toByte).toFixed(fixed) + "M";
  }
  return result;
}