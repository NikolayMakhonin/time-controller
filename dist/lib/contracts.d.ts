export interface ITimeController<THandle = any> {
    now(): number;
    setTimeout(handler: () => void, timeout: number): THandle;
    clearTimeout(handle: THandle): void;
}
