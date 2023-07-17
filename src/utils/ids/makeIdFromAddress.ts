import { Address } from '@graphprotocol/graph-ts';

export function makeIdFromAddress(address: Address): string {
  return address.toHex();
}
