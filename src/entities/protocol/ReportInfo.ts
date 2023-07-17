import { ReportInfo } from './../../../generated/schema';
import { StrategyReported } from './../../../generated/templates/Vault/Vault';
import { Harvest } from '../../../generated/schema';
import { makeIdFromAddress } from '../../utils/ids';
import { makeReportInfoId } from '../../utils/ids/makeReportInfoId';

export function lcReportInfo(harvestId: Harvest, evmEvent: StrategyReported): ReportInfo {
  let id = makeReportInfoId(harvestId.id);

  let entity = ReportInfo.load(id);

  if (!entity) {
    entity = new ReportInfo(id);

    entity.strategy = makeIdFromAddress(evmEvent.params.strategy);
    entity.gain = evmEvent.params.gain;
    entity.loss = evmEvent.params.loss;
    entity.debtPaid = evmEvent.params.debtPaid;
    entity.totalGain = evmEvent.params.totalGain;
    entity.totalLoss = evmEvent.params.totalLoss;
    entity.totalDebt = evmEvent.params.totalDebt;
    entity.debtAdded = evmEvent.params.debtAdded;
    entity.debtRatio = evmEvent.params.debtRatio;

    entity.save();
  }


  return entity as ReportInfo;
}
