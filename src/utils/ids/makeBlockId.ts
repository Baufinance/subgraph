import { ethereum } from "@graphprotocol/graph-ts";

export function makeBlockId(block: ethereum.Block): string {
  return block.number.toString();
}