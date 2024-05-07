
const range = (start: number, end: number) => Array.from({length: (end - start)}, (v, k) => k + start);

export const config = {
  mnemonic: 'test test test test test test test test test test test test', 
  drivedKeyIndex: range(0, 4),
  needIndex: true, 
  needAddress: true, 
  needPrivateKey: true, 
  delimiter: '\t',
}