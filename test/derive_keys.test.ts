import { MetamaskMasterNode } from "../metamask_derive_keys";
import { config } from "./config";

let mmn = new MetamaskMasterNode()
await mmn.init(config.mnemonic)

let nodes = await mmn.deriveN(config.drivedKeyIndex)

mmn.prettyPrint(config.drivedKeyIndex, nodes, config.needIndex, config.needAddress, config.needPrivateKey, config.delimiter)

/** other ways to call */
// mmn.prettyPrint(config.drivedKeyIndex, nodes)
// mmn.prettyPrintAddress(list, nodes)
// mmn.prettyPrintPrivateKey(list, nodes)
