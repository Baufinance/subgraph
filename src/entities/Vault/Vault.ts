import { LPToken } from '../../../generated/CurveFactory/LPToken';
import { Vault as VaultContract } from '../../../generated/templates/Vault/Vault';
import { Vault } from '../../../generated/schema';
import { makeIdFromAddress } from '../../utils/ids';
import { lcToken } from '../other';
import { NewVault } from '../../../generated/CurveFactory/CurveFactory';
import { CurveTypeNames } from '../../utils';
import { cuVaultState } from './VaultState';
import { Address } from '@graphprotocol/graph-ts';
import { lcLPBreakDownSource } from './LPBreakDownSource';

export function lcVault(evmEvent: NewVault): Vault {
  let id = makeIdFromAddress(evmEvent.params.vault);
  let entity = Vault.load(id);

  if (!entity) {
    entity = new Vault(id);
    const vault = VaultContract.bind(evmEvent.params.vault);

    entity.vaultAddress = makeIdFromAddress(evmEvent.params.vault);
    entity.name = vault.name();
    entity.symbol = vault.symbol();
    entity.decimals = vault.decimals();
    entity.lpToken = lcToken(evmEvent.params.lpToken).id;
    entity.lpTokenName = LPToken.bind(evmEvent.params.lpToken).name()
    entity.gauge = makeIdFromAddress(evmEvent.params.gauge);
    entity.poolType = CurveTypeNames[evmEvent.params.poolType];
    entity.vaultInfo = cuVaultState(entity).id;
    entity.lpBreakDownSource = lcLPBreakDownSource(entity).id;
    entity.updatedAtBlock = evmEvent.block.number;
    entity.save();
  }


  return entity as Vault;
}

export function lVault(vaultAddress: Address): Vault {
  let id = makeIdFromAddress(vaultAddress);
  let entity = Vault.load(id);

  if (!entity) {
    throw new Error(`Vault(${id}) not found`);
  }

  return entity as Vault;
}