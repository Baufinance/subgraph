import { ethereum } from '@graphprotocol/graph-ts';
import { Block } from '../../../generated/schema';

export function makeHarvestId(vaultId: string, block: Block): string {
return `${vaultId}-${block.number.toString()}`
}