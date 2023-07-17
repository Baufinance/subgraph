export function makeUserDepositId(userId: string, vaultId: string): string {
  return `${userId}-${vaultId}`
}