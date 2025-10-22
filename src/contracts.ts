export interface ITimeController<THandle = any> {
	now(): number
  /**
   * Auto-incrementing timestamp
   * @return a value greater than now() by at least 1 and greater than previous nowUnique() by exactly 1
   */
	nowUnique(): number
	setTimeout(handler: () => void, timeout: number): THandle
	clearTimeout(handle: THandle): void
}

