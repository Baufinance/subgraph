import { BigInt } from '@graphprotocol/graph-ts';
import { Address } from '@graphprotocol/graph-ts';
import { Vault, VaultState } from '../../../generated/schema';
import { Vault as VaultContract } from '../../../generated/templates/Vault/Vault';


export function cuVaultState(
  vault: Vault,
): VaultState {
  const vaultContract = VaultContract.bind(Address.fromString(vault.vaultAddress));
  const lastReport = vaultContract.lastReport() !== vaultContract.activation()? vaultContract.lastReport() : null
  
  let entity = VaultState.load((vault.id));

  if (!entity) {
    entity = new VaultState(vault.id);
    
    
    entity.vault = vault.id;
    entity.lastHarvest = lastReport? lastReport :new BigInt(0);
    entity.totalAssets = vaultContract.totalAssets();
    entity.pricePerOneShare = vaultContract.pricePerShare();

    entity.save();

  } else {

    entity.lastHarvest = lastReport? lastReport :new BigInt(0);
    entity.totalAssets = vaultContract.totalAssets();
    entity.pricePerOneShare = vaultContract.pricePerShare();
    
    entity.save();
  }

  
  
  return entity;
}
