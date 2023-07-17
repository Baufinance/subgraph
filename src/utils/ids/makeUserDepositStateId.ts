import { Block } from "../../../generated/schema";

export function makeUserDepositStateId(userDepositId: string, block: Block): string {
  return `${userDepositId}-${block.number.toString()}`
}