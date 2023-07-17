import { lcUserDepositState } from './UserDepositState';
import { Block, UserDeposit } from '../../../generated/schema';
import { lBlock } from '../blockchain';
import { makeBlockId } from '../../utils/ids';
import { cuLastUserDepositState, lLastUserDepositState } from './LastUserDepositState';

export function handleDepositChange(
  deposit: UserDeposit,
  block: Block
): void {
  // let currentblock = lBlock(makeBlockId(block));
  // let lastState = lLastUserDepositState(deposit);
  // let nextState = lcUserDepositState(deposit, block);
  // cuLastUserDepositState(deposit, nextState);
}
