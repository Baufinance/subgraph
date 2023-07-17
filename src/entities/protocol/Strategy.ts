import {  Strategy } from './../../../generated/schema';
import { StrategyAdded } from './../../../generated/templates/Vault/Vault';
import { Vault } from '../../../generated/schema';
import { makeIdFromAddress } from '../../utils/ids';
import { Address } from '@graphprotocol/graph-ts';
import { makeStrategyId } from '../../utils/ids/makeStrategyId';

export function lcStrategy(vault: Vault, evmEvent: StrategyAdded): Strategy {

    let id = makeStrategyId(vault.id, evmEvent.params.strategy);

    let entity = Strategy.load(vault.id);

    if (!entity) {

        entity = new Strategy(vault.id);

        entity.vault = vault.id;
        entity.address = makeIdFromAddress(evmEvent.params.strategy);
        entity.isActive = true;
        entity.debtRatio = evmEvent.params.debtRatio;
        entity.minDebtPerHarvest = evmEvent.params.minDebtPerHarvest;
        entity.maxDebtPerHarvest = evmEvent.params.maxDebtPerHarvest;

        entity.save();
    }


    return entity as Strategy;
}

export function lStrategy(vault: Vault, strategyAddress: Address): Strategy {

    let id = makeStrategyId(vault.id, strategyAddress);

    let entity = Strategy.load(vault.id);

    if (!entity) {
        throw new Error(`Strategy(${id}) not found`);
    }

    return entity as Strategy;
}