import { BigInt } from '@graphprotocol/graph-ts';
import { LastUserDepositState, UserDeposit, UserDepositState } from '../../../generated/schema';

function makeId(deposit: UserDeposit): string {
  return deposit.id;
}

export function cuLastUserDepositState(
  deposit: UserDeposit,
  state: UserDepositState,
): LastUserDepositState {
  let entity = LastUserDepositState.load(makeId(deposit));

  if (!entity) {
    entity = new LastUserDepositState(makeId(deposit));
    entity.deposit = deposit.id;
  }

  entity.state = state.id;
  entity.save();

  return entity;
}

export function lLastUserDepositState(
  deposit: UserDeposit,
): LastUserDepositState | null {
  return LastUserDepositState.load(makeId(deposit));
}
