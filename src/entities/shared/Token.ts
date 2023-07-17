import { ERC20 } from './../../../generated/templates/Vault/ERC20';
import { Address } from '@graphprotocol/graph-ts';
import { Token } from '../../../generated/schema';

export function lcToken(address: Address): Token {
  let token = Token.load(address.toHex());

  if (!token) {

    token = new Token(address.toHex());

    token.decimals = fetchTokenDecimals(address);
    token.symbol = fetchTokenSymbol(address);
    token.name = fetchTokenName(address);


    token.save();
  }

  return token as Token;
}

export function lToken(tokenId: string): Token {
  let entity = Token.load(tokenId);

  if (!entity) {
    throw new Error(`Token(${tokenId}) not found`);
  }

  return entity as Token;
}

function fetchTokenDecimals(tokenAddress: Address): i32 {
  return ERC20.bind(tokenAddress).decimals();
}

function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);

  let symbol = contract.symbol();

  return symbol;

}

function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);

  let name = contract.name();

  return name;

}
