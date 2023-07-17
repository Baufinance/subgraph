import { Address } from '@graphprotocol/graph-ts';
import { Block,  UserDeposit, UserDepositState } from '../../../generated/schema';
import { makeUserDepositStateId } from '../../utils/ids';
import { Vault as VaultContract } from '../../../generated/templates/Vault/Vault';

export function lcUserDepositState(
  deposit: UserDeposit,
  block: Block
): UserDepositState {
  let id = makeUserDepositStateId(deposit.id, block);
  let entity = UserDepositState.load(id);

  if (!entity) {
    entity = new UserDepositState(id);
    entity.deposit = deposit.id;
    const vault = VaultContract.bind(Address.fromString(deposit.vault));
    const lpTokenBalance = vault.pricePerShare().times(vault.balanceOf(Address.fromString(deposit.user)));

    entity.lpTokenAmount = lpTokenBalance;
    entity.shareTokenAmount = vault.balanceOf(Address.fromString(deposit.user));
    entity.pricePerShare = vault.pricePerShare(); 
    entity.block = block.id;
    entity.updatedAtBlock = block.number;
    
    entity.save();
  }

  return entity as UserDepositState;
}
