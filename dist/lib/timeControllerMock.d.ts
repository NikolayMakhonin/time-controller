import { ITimeController } from './contracts';
import { type PairingNode } from '@flemist/pairing-heap';
interface IHandle {
    id: number;
    time: number;
    callback: () => void;
}
export declare class TimeControllerMock implements ITimeController<PairingNode<IHandle>> {
    private readonly _handles;
    private _now;
    private _nowUnique;
    private _nextId;
    constructor();
    get queueSize(): number;
    get nextQueuedTime(): number | null;
    addTime(time: number): void;
    setTime(time: number): void;
    now(): number;
    nowUnique(): number;
    setTimeout(callback: () => void, timeout: number): PairingNode<IHandle>;
    clearTimeout(handle: PairingNode<IHandle>): void;
}
export {};
