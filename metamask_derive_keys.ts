import { BIP44Node, BIP44PurposeNodeToken } from '@metamask/key-tree';
//@ts-ignore
import { getBIP44CoinTypeToAddressPathTuple } from './node_modules/@metamask/key-tree/dist/esm/utils.js'

const range = (start: number, end: number) => Array.from({length: (end - start)}, (v, k) => k + start);

class MetamaskMasterNode {
  rootnode: any = null
  constructor(){}
  async init(mnemonic: string) {
    const mnemonicBip39Node = `bip39:${mnemonic}` as const;
    // Ethereum coin type node
    const node = await BIP44Node.fromDerivationPath({
      derivationPath: [
        mnemonicBip39Node,
        BIP44PurposeNodeToken,
        `bip32:60'`,
      ],
    });
    this.rootnode = node;
  }

  async derive(index: number): Promise<BIP44Node>{
      const childNode = await this.rootnode.derive(
        getBIP44CoinTypeToAddressPathTuple({ address_index: index }),
      );
      return childNode;
  }

  async deriveN(idxlist: number[]): Promise<BIP44Node[]>{
    let childNodes = new Array<BIP44Node>
    for (let i =0;i<list.length; i++){
      childNodes.push(await this.derive(i))
    }
    return childNodes;
  }

  prettyPrint(childNodes: BIP44Node[], needIndex=true, needAddress=true, needPrivateKey=true, delimiter='\t'){
    console.log(`${needIndex?'index'+delimiter:''}${needAddress?delimiter+'address'+delimiter.repeat(5):''}${needPrivateKey?delimiter+'sk':''}`)
    list.forEach(index => {
      console.log(`${needIndex?index+delimiter:''}${needAddress?childNodes[index].address+delimiter:''}${needPrivateKey?childNodes[index].privateKey:''}`)
    });
  }

  prettyPrintAddress(childNodes: BIP44Node[]){
    this.prettyPrint(childNodes, false, true, false)
  }
  prettyPrintPrivateKey(childNodes: BIP44Node[]){
    this.prettyPrint(childNodes, false, false, true)
  }
}


// test only, todo: move to tests
// const fixtures = {
//   mnemonic:
//     'romance hurry grit huge rifle ordinary loud toss sound congress upset twist',
//   addresses: [
//     '0x5df603999c3d5ca2ab828339a9883585b1bce11b',
//     '0x441c07e32a609afd319ffbb66432b424058bcfe9',
//     '0x1f7c93dfe849c06dd610e77473bfaaef7f183c7c',
//     '0x9e28bae18e0e358b12796697c6546f77d4657527',
//     '0x6e7734c7f4fb973a3800b72fb1a6bf82d85d3d29',
//     '0xf87328a8ea5208946c60dbd9385d4c8533ad5dd8',
//   ],
// }
// const { mnemonic, addresses } = fixtures;
// for (let index = 0; index < addresses.length; index++) {
//   const expectedAddress = addresses[index];
//   console.log(nodes[index].privateKey)
//   console.log('derived:',nodes[index].address, 'expected:',expectedAddress);
// }
// for (let index = 0; index < addresses.length; index++) {
//   const expectedAddress = addresses[index];
//   let childNode = await mmn.derive(index) 
//   console.log('derived:',childNode.privateKey, 'expected:',expectedAddress);
// }

// test only data
let test_mnemonic = 'romance hurry grit huge rifle ordinary loud toss sound congress upset twist'

let mmn = new MetamaskMasterNode()
await mmn.init(test_mnemonic)

let list = range(0, 6)
let nodes = await mmn.deriveN(list)
// mmn.prettyPrint(nodes, false, false, true)
// mmn.prettyPrint(nodes)
// mmn.prettyPrintAddress(nodes)
mmn.prettyPrintPrivateKey(nodes)