import {ITimeController} from './contracts'

export class TimeControllerDefault implements ITimeController {
  now(): number {
    return Date.now()
  }

  setTimeout(handler: () => void, timeout: number): any {
    return setTimeout(handler, timeout)
  }

  clearTimeout(handle: any): void {
    clearTimeout(handle)
  }
}

export const timeControllerDefault = new TimeControllerDefault()
