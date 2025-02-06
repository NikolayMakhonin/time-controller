import {ITimeController} from './contracts'

export class TimeControllerDefault implements ITimeController {
  private readonly _handles: Set<any> = new Set()

  now(): number {
    return Date.now()
  }

  get queueSize(): number {
    return this._handles.size
  }

  setTimeout(handler: () => void, timeout: number): any {
    const handle = setTimeout(() => {
      this._handles.delete(handle)
      handler()
    }, timeout)
    this._handles.add(handle)
    return handler
  }

  clearTimeout(handle: any): void {
    clearTimeout(handle)
    this._handles.delete(handle)
  }
}
