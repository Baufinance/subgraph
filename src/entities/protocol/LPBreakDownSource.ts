import { Registry } from './../../../generated/templates/Vault/Registry';
import { LPBreakdownSource } from './../../../generated/schema';
import { Vault } from '../../../generated/schema';
import { makeIdFromAddress } from '../../utils/ids';
import { REGISTRY_ADDRESS } from '../../utils';
import { Address } from '@graphprotocol/graph-ts';


export function lcLPBreakDownSource(vault: Vault): LPBreakdownSource {

  let entity = LPBreakdownSource.load(vault.id);

  if (!entity) {
    entity = new LPBreakdownSource(vault.id);

    const registryContract = Registry.bind(REGISTRY_ADDRESS);

    entity.vault = vault.id;
    entity.lpToken = vault.lpToken;
    entity.pool = makeIdFromAddress(registryContract.get_pool_from_lp_token(Address.fromString(vault.lpToken)));
    entity.registry = makeIdFromAddress(REGISTRY_ADDRESS);

    entity.save();
  }


  return entity as LPBreakdownSource;
}
