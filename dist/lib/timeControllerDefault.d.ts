import { ITimeController } from './contracts';
export declare class TimeControllerDefault implements ITimeController {
    private readonly _handles;
    now(): number;
    get queueSize(): number;
    setTimeout(handler: () => void, timeout: number): any;
    clearTimeout(handle: any): void;
}
export declare const timeControllerDefault: TimeControllerDefault;
