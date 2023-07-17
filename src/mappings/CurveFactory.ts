import { NewVault } from './../../generated/CurveFactory/CurveFactory';
import { Vault } from '../../generated/templates';
import { lcVault } from '../entities/Vault/Vault';

export function handleNewVault(evmEvent: NewVault): void {

  lcVault(evmEvent);

  Vault.create(evmEvent.params.vault);

}