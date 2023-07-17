import { Address } from '@graphprotocol/graph-ts';

export function makeStrategyId(vaultId: string, strategyAddress: Address): string {
    return `${vaultId}-${strategyAddress.toHex()}`
}