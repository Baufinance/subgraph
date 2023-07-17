import { ethereum } from '@graphprotocol/graph-ts';
import { Transaction, User, Vault } from '../../../generated/schema';
import { lcBlock } from './Block';

export function lcTransaction(
  user: User,
  vault: Vault,
  tx: ethereum.Transaction,
  block: ethereum.Block,
): Transaction {
  let entity = Transaction.load(tx.hash.toHex());

  if (!entity) {
    entity = new Transaction(tx.hash.toHex());

    entity.index = tx.index.toI32();
    entity.user = user.id;
    entity.vault = vault.id;
    entity.block = lcBlock(block).id;
    entity.updatedAtBlock = block.number;

    entity.save();
  }

  return entity as Transaction;
}
