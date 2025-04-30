export function getErrorMessage(err: unknown, fallbackMsg: string) {
  return err instanceof Error ? err.message : fallbackMsg;
}
