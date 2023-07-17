import { ethereum } from '@graphprotocol/graph-ts';
import { Block } from '../../../generated/schema';
import { makeBlockId } from '../../utils/ids';

export function lcBlock(block: ethereum.Block): Block {
  let id = makeBlockId(block);
  let entity = Block.load(id);

  if (!entity) {
    entity = new Block(id);

    entity.number = block.number;
    entity.timeUnix = block.timestamp;
    entity.updatedAtBlock = block.number

    entity.save();
  }

  return entity as Block;
}

export function lBlock(blockId: string): Block {
  let entity = Block.load(blockId);

  if (!entity) {
    throw new Error(`Block(${blockId}) not found`);
  }

  return entity as Block;
}