import { Deposit, StrategyAdded, StrategyMigrated, StrategyReported, StrategyRevoked, StrategyUpdateDebtRatio, StrategyUpdateMaxDebtPerHarvest, Transfer, Withdraw } from './../../generated/templates/Vault/Vault';
import { Address, dataSource } from '@graphprotocol/graph-ts';
import { lcBlock, lcTransaction } from '../entities/blockchain';
import { lVault } from '../entities/protocol';
import { lcUser } from '../entities/user';
import {
  lcUserDepositState,
} from '../entities/collateral';

import { lcUserDeposit } from '../entities/deposit';
import { cuVaultState } from '../entities/protocol/VaultState';
import { cuLastUserDepositState } from '../entities/deposit/LastUserDepositState';
import { lcHarvest } from '../entities/protocol/Harvest';
import { lStrategy, lcStrategy } from '../entities/protocol/Strategy';
import { laVaultUsers } from '../entities/user/vaultUsers';


export function handleDeposit(evmEvent: Deposit): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);
  let block = lcBlock(evmEvent.block);
  let user = lcUser(evmEvent.params.recipient, evmEvent.block);
  let userDeposit = lcUserDeposit(user.id, vault.id, evmEvent.block);

  lcTransaction(user, vault, evmEvent.transaction, evmEvent.block)

  let nextState = lcUserDepositState(userDeposit, block);
  cuLastUserDepositState(userDeposit, nextState);
  cuVaultState(vault);
}

export function handleWithdraw(evmEvent: Withdraw): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);
  let block = lcBlock(evmEvent.block);
  let user = lcUser(evmEvent.params.recipient, evmEvent.block);
  let userDeposit = lcUserDeposit(user.id, vault.id, evmEvent.block);

  lcTransaction(user, vault, evmEvent.transaction, evmEvent.block)

  let nextState = lcUserDepositState(userDeposit, block);
  cuLastUserDepositState(userDeposit, nextState);
  cuVaultState(vault);
}

export function handleTransfer(evmEvent: Transfer): void {

  //mint share tokens(deposit)
  if (evmEvent.params.sender.equals(Address.zero())) {
    return; //we skip because we handled this transfer in handleDeposit
  }

  //burn share tokens(withdraw)
  if (evmEvent.params.receiver.equals(Address.zero())) {
    return; //we skip because we handled this transfer in handleWithdraw
  }

  //standard transferring share tokens to somebody

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);
  let block = lcBlock(evmEvent.block);

  let userFrom = lcUser(evmEvent.params.sender, evmEvent.block);
  let userTo = lcUser(evmEvent.params.receiver, evmEvent.block);

  let userDepositFrom = lcUserDeposit(userFrom.id, vault.id, evmEvent.block);
  let userDepositTo = lcUserDeposit(userTo.id, vault.id, evmEvent.block);

  lcTransaction(userFrom, vault, evmEvent.transaction, evmEvent.block)
  lcTransaction(userTo, vault, evmEvent.transaction, evmEvent.block)

  let nextUserFromState = lcUserDepositState(userDepositFrom, block);
  let nextUserToState = lcUserDepositState(userDepositFrom, block);

  cuLastUserDepositState(userDepositFrom, nextUserFromState);
  cuLastUserDepositState(userDepositTo, nextUserToState);

}

export function handleStrategyReported(evmEvent: StrategyReported): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);
  let block = lcBlock(evmEvent.block);
  
  lcHarvest(evmEvent, vault, block);

  //need to update all users states after harvest
  let vaultUsers = laVaultUsers(vault.id);

  for (let i = 0; i < vaultUsers.vaultUsers.length; i++) {
    let user =  lcUser(Address.fromString(vaultUsers.vaultUsers[i]), evmEvent.block);
    let userDeposit = lcUserDeposit(user.id, vault.id, evmEvent.block);
    let nextState = lcUserDepositState(userDeposit, block);
    cuLastUserDepositState(userDeposit, nextState);
  }
  
  cuVaultState(vault);
}

export function handleStrategyAdded(evmEvent: StrategyAdded): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);

  lcStrategy(vault, evmEvent);

}

export function handleStrategyUpdateDebtRatio(evmEvent: StrategyUpdateDebtRatio): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);

  let strategy = lStrategy(vault, evmEvent.params.strategy);

  strategy.debtRatio = evmEvent.params.debtRatio;
}

export function handleStrategyUpdateMaxDebtPerHarvest(evmEvent: StrategyUpdateMaxDebtPerHarvest): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);

  let strategy = lStrategy(vault, evmEvent.params.strategy);

  strategy.maxDebtPerHarvest = evmEvent.params.maxDebtPerHarvest;
}

export function handleStrategyRevoked(evmEvent: StrategyRevoked): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);

  let strategy = lStrategy(vault, evmEvent.params.strategy);
  strategy.isActive = false;

}

export function handleStrategyMigrated(evmEvent: StrategyMigrated): void {

  let vaultAddress = dataSource.address();
  let vault = lVault(vaultAddress);

  let oldStrategy = lStrategy(vault, evmEvent.params.oldVersion);
  let newStrategy = lStrategy(vault, evmEvent.params.newVersion);
  oldStrategy.isActive = oldStrategy.isActive ? false : oldStrategy.isActive;
  newStrategy.isActive = newStrategy.isActive ? newStrategy.isActive : true;
}
