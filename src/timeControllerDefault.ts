import {ITimeController} from './contracts'

export class TimeControllerDefault implements ITimeController {
  private _nowUnique: number = 0
  
  now(): number {
    return Math.max(this._nowUnique, Date.now())
  }
  
  nowUnique(): number {
    const next = this.now() + 1
    this._nowUnique = next
    return next
  }

  setTimeout(handler: () => void, timeout: number): any {
    return setTimeout(handler, timeout)
  }

  clearTimeout(handle: any): void {
    clearTimeout(handle)
  }
}

export const timeControllerDefault = new TimeControllerDefault()
