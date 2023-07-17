import { Block } from './../../../generated/schema';
import { StrategyReported, Vault as VaultContract } from './../../../generated/templates/Vault/Vault';
import { Harvest, Vault } from '../../../generated/schema';
import { makeHarvestId } from '../../utils/ids';
import { Address } from '@graphprotocol/graph-ts';
import { lcReportInfo } from './ReportInfo';

export function lcHarvest(evmEvent: StrategyReported, vault: Vault, block: Block): Harvest {
  let id = makeHarvestId(vault.id, block);

  let entity = Harvest.load(id);

  if (!entity) {
    entity = new Harvest(id);

    const vaultInstance = VaultContract.bind(Address.fromString(vault.vaultAddress));

    entity.vault = vault.id;
    entity.pricePerShare = vaultInstance.pricePerShare();
    entity.reportInfo = lcReportInfo(entity, evmEvent).id;
    entity.block = block.id;

    entity.save();
  }


  return entity as Harvest;
}
