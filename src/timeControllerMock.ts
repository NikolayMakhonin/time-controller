import {ITimeController} from './contracts'
import {PairingHeap, PairingNode} from '@flemist/pairing-heap'

interface IHandle {
	id: number,
	time: number,
  callback: () => void,
}

function lessThanHandles(o1: IHandle, o2: IHandle): boolean {
  if (o1.time > o2.time) {
    return false
  }
  if (o1.time < o2.time) {
    return true
  }
  if (o1.id > o2.id) {
    return false
  }
  if (o1.id < o2.id) {
    return true
  }

  return false
}

export class TimeControllerMock implements ITimeController<PairingNode<IHandle>> {
  private readonly _handles: PairingHeap<IHandle>
  private _now: number = 1
  private _nextId: number = 0

  constructor() {
    this._handles = new PairingHeap<IHandle>({
      lessThanFunc: lessThanHandles,
    })
  }

  get queueSize(): number {
    return this._handles.size
  }

  addTime(time: number) {
    this.setTime(this._now + time)
  }

  setTime(time: number) {
    const {_handles, _now: now} = this

    if (time < this._now) {
      throw new Error(`time (${time}) should be >= now (${now})`)
    }

    while (true) {
      const minHandle: IHandle = _handles.getMin()

      if (!minHandle || minHandle.time > time) {
        break
      }

      this._handles.deleteMin()
      this._now = minHandle.time
      minHandle.callback()
    }

    this._now = time
  }

  now(): number {
    return this._now
  }

  setTimeout(callback: () => void, timeout: number): PairingNode<IHandle> {
    const node = this._handles.add(Object.freeze({
      id  : this._nextId++,
      time: this._now + timeout,
      callback,
    }))
    return node
  }

  clearTimeout(handle: PairingNode<IHandle>) {
    this._handles.delete(handle)
  }
}
