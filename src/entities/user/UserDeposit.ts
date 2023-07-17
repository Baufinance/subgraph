import { ethereum } from '@graphprotocol/graph-ts';
import { UserDeposit } from '../../../generated/schema';
import { makeUserDepositId } from '../../utils/ids';
import { laVaultUsers } from './VaultUsers';

export function lcUserDeposit(
  userId: string,
  vaultId: string,
  block: ethereum.Block,
): UserDeposit {
  let id = makeUserDepositId(userId, vaultId);
  let entity = UserDeposit.load(id);

  if (!entity) {
    entity = new UserDeposit(id);

    entity.user = userId;
    entity.vault = vaultId;
    entity.updatedAtBlock = block.number;
    laVaultUsers(vaultId, userId);
    
    entity.save();
  }

  return entity;
}
