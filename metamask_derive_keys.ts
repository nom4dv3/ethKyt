import { BIP44Node, BIP44PurposeNodeToken, getBIP44CoinTypeToAddressPathTuple } from '@metamask/key-tree';

export class MetamaskMasterNode {
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
    for (let i =0;i<idxlist.length; i++){
      childNodes.push(await this.derive(idxlist[i]))
    }
    return childNodes;
  }

  prettyPrint(idxlist: number[], childNodes: BIP44Node[], needIndex=true, needAddress=true, needPrivateKey=true, delimiter='\t'){
    console.log(`${needIndex?'index'+delimiter:''}${needAddress?delimiter+'address'+delimiter.repeat(5):''}${needPrivateKey?delimiter+'sk':''}`)
    for ( let i = 0; i < idxlist.length; i++){
      let index = idxlist[i]
      console.log(`${needIndex?index+delimiter:''}${needAddress?childNodes[i].address+delimiter:''}${needPrivateKey?childNodes[i].privateKey:''}`)
    }
  }

  prettyPrintAddress(idxlist: number[], childNodes: BIP44Node[]){
    this.prettyPrint(idxlist, childNodes, false, true, false)
  }
  prettyPrintPrivateKey(idxlist: number[], childNodes: BIP44Node[]){
    this.prettyPrint(idxlist, childNodes, false, false, true)
  }
}
