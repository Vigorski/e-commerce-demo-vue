const defaultExpiryTimestamp = 86400000; // 24 hours
// const defaultExpiryTimestamp = 10000; // 10 seconds

export function isSessionExpired(
  lastLoginTimestamp: number,
  maxAgeMs: number = defaultExpiryTimestamp
) {
  const remaining = Number(lastLoginTimestamp) + maxAgeMs - Date.now();
  return remaining < 0;
}
