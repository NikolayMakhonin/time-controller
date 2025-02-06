import { ITimeController } from './contracts';
export declare class TimeControllerDefault implements ITimeController {
    now(): number;
    setTimeout(handler: () => void, timeout: number): any;
    clearTimeout(handle: any): void;
}
export declare const timeControllerDefault: TimeControllerDefault;
