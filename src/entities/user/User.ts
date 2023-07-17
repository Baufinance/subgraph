import { Address, ethereum } from '@graphprotocol/graph-ts';
import { User } from '../../../generated/schema';

export function lcUser(address: Address, block: ethereum.Block): User {
  let user = User.load(address.toHex());

  if (!user) {
    user = new User(address.toHex());
    user.updatedAtBlock = block.number;
    user.save();
  }

  return user as User;

}
