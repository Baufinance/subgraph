import { _VaultUsers } from '../../../generated/schema';


export function laVaultUsers(vaultId: string, userId: string | null = null): _VaultUsers {
  let entity = _VaultUsers.load(vaultId);

  if (!entity) {
    entity = new _VaultUsers(vaultId);
    entity.vaultUsers = [];
  }

  if (entity && userId !== null) {

    entity.vaultUsers.push(userId);

    entity.save();
  }


  return entity as _VaultUsers
}