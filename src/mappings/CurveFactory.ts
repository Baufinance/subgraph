import { NewVault } from './../../generated/CurveFactory/CurveFactory';
import {lcVault } from '../entities/protocol';
import { Vault } from '../../generated/templates';

export function handleNewVault(evmEvent: NewVault): void {

  lcVault(evmEvent);

  Vault.create(evmEvent.params.vault);

}
