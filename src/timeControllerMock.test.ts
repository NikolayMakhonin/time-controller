import {createTestVariants} from '@flemist/test-variants'
import {TimeControllerMock} from './timeControllerMock'
import {ITimeController} from './contracts'
import {timeControllerDefault} from './timeControllerDefault'
import {delay} from './test/delay'
// import {
//   setProcessPriority,
//   setThreadPriority,
//   PROCESS_PRIORITY_REALTIME,
//   THREAD_PRIORITY_REALTIME,
// } from 'rdtsc'

describe('time-controller > timeControllerMock', function () {
  function test({
    timeController,
    times,
    postDelay,
    resolve,
  }: {
    timeController: ITimeController,
    times: {index: number, start: number|null, timeout: number, abort: number|null}[],
    postDelay: number,
    resolve: (result: string[]) => void,
  }) {
    const result: string[] = []
    let timeMax = 0
    for (let i = 0, len = times.length; i < len; i++) {
      const time = times[i]
      timeMax = Math.max(timeMax, (time.start || 0) + Math.max(time.timeout || 0, time.abort || 0))

      const start = () => {
        const handle = timeController.setTimeout(() => {
          result.push(`completed: ${time.index}`)
        }, time.timeout)

        if (time.abort != null) {
          if (time.abort < 0) {
            timeController.clearTimeout(handle)
          }
          else {
            timeController.setTimeout(() => {
              timeController.clearTimeout(handle)
              result.push(`aborted: ${time.index}`)
            }, time.abort)
          }
        }
      }

      if (time.start == null) {
        start()
      }
      else {
        timeController.setTimeout(start, time.start)
      }
    }

    timeController.setTimeout(() => {
      resolve(result)
    }, timeMax + postDelay)

    return timeMax + postDelay
  }

  function createTimes({
    time1Start,
    time1Timeout,
    time1Abort,
    time2Start,
    time2Timeout,
    time2Abort,
    time3Start,
    time3Timeout,
    time3Abort,
  }: {
    time1Start: number|null,
    time1Timeout: number|null,
    time1Abort: number|null,
    time2Start: number|null,
    time2Timeout: number|null,
    time2Abort: number|null,
    time3Start: number|null,
    time3Timeout: number|null,
    time3Abort: number|null,
  }): [{index: number, start: number|null, timeout: number, abort: number|null}[]] {
    const times = []
    let index = 0
    if (time1Timeout != null) {
      times.push({
        index,
        start  : time1Start,
        timeout: time1Timeout,
        abort  : time1Abort,
      })
      index++
    }
    if (time2Timeout != null) {
      times.push({
        index,
        start  : time2Start,
        timeout: time2Timeout,
        abort  : time2Abort,
      })
      index++
    }
    if (time3Timeout != null) {
      times.push({
        index,
        start  : time3Start,
        timeout: time3Timeout,
        abort  : time3Abort,
      })
      index++
    }

    return [times]
  }

  const testVariants = createTestVariants(({
    times,
    step1,
    step2,
    step3,
    expectedResult,
  }: {
    time1Start: number|null,
    time1Timeout: number|null,
    time1Abort: number|null,
    time2Start: number|null,
    time2Timeout: number|null,
    time2Abort: number|null,
    time3Start: number|null,
    time3Timeout: number|null,
    time3Abort: number|null,
    times: {index: number, start: number|null, timeout: number, abort: number|null}[],
    step1: number,
    step2: number,
    step3: number,
    expectedResult: string[],
  }) => {
    const steps = [step1, step2, step3].filter(o => o != null)

    const timeController = new TimeControllerMock()

    let result: string[]
    let expectedTime = test({
      timeController,
      times,
      postDelay: 0,
      resolve  : o => {
        result = o
      },
    })

    for (let i = 0, len = steps.length; i < len; i++) {
      const step = steps[i]
      expectedTime -= step
      timeController.addTime(step)
    }
    timeController.addTime(Math.max(0, expectedTime))

    // console.log(result)
    assert.deepStrictEqual(result, expectedResult)
  })

  function createExpectedResult({
    times,
  }: {
    times: {index: number, start: number|null, timeout: number, abort: number|null}[],
  }) {
    const events = []
    times.forEach(time => {
      if (time.abort != null && time.abort < 0) {
        return
      }
      if (time.abort == null || time.abort >= time.timeout) {
        events.push({
          time : (time.start || 0) + (time.timeout || 0),
          start: time.start,
          index: time.index * 2,
          event: `completed: ${time.index}`,
        })
      }
      if (time.abort != null) {
        events.push({
          time : (time.start || 0) + (time.abort || 0),
          start: time.start,
          index: time.index * 2 + 1,
          event: `aborted: ${time.index}`,
        })
      }
    })
    events.sort((o1, o2) => {
      if (o1.time !== o2.time) {
        return o1.time > o2.time || o1.time !== null && o2.time === null ? 1 : -1
      }
      if (o1.start !== o2.start) {
        return o1.start > o2.start || o1.start !== null && o2.start === null ? 1 : -1
      }
      if (o1.index !== o2.index) {
        return o1.index > o2.index ? 1 : -1
      }
      throw new Error('Unexpected behavior')
    })
    const expectedResult = events.map(o => o.event)

    return [expectedResult]
  }

  const testVariantsExpectedResult = createTestVariants(async ({
    time1Start,
    time1Timeout,
    time1Abort,
    time2Start,
    time2Timeout,
    time2Abort,
    time3Start,
    time3Timeout,
    time3Abort,
    times,
    expectedResult,
  }: {
    time1Start: number|null,
    time1Timeout: number|null,
    time1Abort: number|null,
    time2Start: number|null,
    time2Timeout: number|null,
    time2Abort: number|null,
    time3Start: number|null,
    time3Timeout: number|null,
    time3Abort: number|null,
    times: {index: number, start: number|null, timeout: number, abort: number|null}[],
    expectedResult: string[],
  }) => {
    if (times.length === 0) {
      return
    }

    const result = await new Promise<string[]>((resolve, reject) => {
      test({
        timeController: timeControllerDefault,
        times,
        postDelay     : 100,
        resolve,
      })
    })

    assert.deepStrictEqual(result, expectedResult)

    console.log(`${time3Start}, ${time3Timeout}, ${time3Abort}, ${time2Start}, ${time2Timeout}, ${time2Abort}, ${time1Start}, ${time1Timeout}, ${time1Abort}`)
  })

  xit('setTimeout order', async function () {
    const result: number[] = []
    for (let i = 0; i < 100; i++) {
      setTimeout(() => result.push(4), 3)
      setTimeout(() => result.push(5), 3)
      setTimeout(() => result.push(6), 3)
      setTimeout(() => result.push(1), 0)
      setTimeout(() => result.push(2), 0)
      setTimeout(() => result.push(3), 0)
      await delay(10)
      assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6])
      result.length = 0
    }
  })

  xit('expectedResult', async function () {
    this.timeout(600000000)

    // setProcessPriority(PROCESS_PRIORITY_REALTIME)
    // setThreadPriority(THREAD_PRIORITY_REALTIME)

    const iterations = await testVariantsExpectedResult({
      time3Timeout: [null, 0, 170],
      time3Start  : ({time3Timeout}) => time3Timeout == null ? [null] : [null, 0, 170],
      time3Abort  : ({time3Timeout}) => time3Timeout == null ? [null] : [null, -1, 0, 170],

      time2Timeout: [null, 0, 70],
      time2Start  : ({time2Timeout}) => time2Timeout == null ? [null] : [null, 0, 70],
      time2Abort  : ({time2Timeout}) => time2Timeout == null ? [null] : [null, -1, 0, 70],

      time1Timeout: [null, 0, 50],
      time1Start  : ({time1Timeout}) => time1Timeout == null ? [null] : [null, 0, 50],
      time1Abort  : ({time1Timeout}) => time1Timeout == null ? [null] : [null, -1, 0, 50],

      times         : createTimes,
      expectedResult: createExpectedResult,
    })({
      forceAwaitInterval: 5000,
    })

    console.log('iterations: ' + iterations)
  })

  it('base', async function () {
    this.timeout(1800000)

    const iterations = await testVariants({
      time3Timeout: [null, 0, 1, 2],
      time3Start  : ({time3Timeout}) => time3Timeout == null ? [null] : [null, 0, 1, 2],
      time3Abort  : ({time3Timeout}) => time3Timeout == null ? [null] : [null, -1, 0, 1, 2],

      time2Timeout: [null, 0, 1, 2],
      time2Start  : ({time2Timeout}) => time2Timeout == null ? [null] : [null, 0, 1, 2],
      time2Abort  : ({time2Timeout}) => time2Timeout == null ? [null] : [null, -1, 0, 1, 2],

      time1Timeout: [null, 0, 1, 2],
      time1Start  : ({time1Timeout}) => time1Timeout == null ? [null] : [null, 0, 1, 2],
      time1Abort  : ({time1Timeout}) => time1Timeout == null ? [null] : [null, -1, 0, 1, 2],

      times         : createTimes,
      expectedResult: createExpectedResult,
      step1         : typeof window !== 'undefined' ? [null] : [null, 0, 1, 2],
      step2         : [null, 0, 1, 2],
      step3         : [null, 0, 1, 2],
    })({
      forceAwaitInterval: 5000,
    })

    console.log('iterations: ' + iterations)
  })
})
