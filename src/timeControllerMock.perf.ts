import {calcPerformance} from 'rdtsc'
import {ITimeController} from './contracts'
import {TimeControllerMock} from './timeControllerMock'

describe('time-controller > timeControllerMock perf', function () {
  this.timeout(600000)

  it('base', async function () {
    let timeController: ITimeController
    let handle: any
    function func() {}

    const timeControllerFilled: ITimeController = new TimeControllerMock()
    for (let i = 0; i < 100; i++) {
      timeControllerFilled.setTimeout(func, 4)
    }
    
    let result = calcPerformance(
      10000,
      () => {

      },
      () => {
        timeController = new TimeControllerMock()
      },
      () => {
        handle = timeController.setTimeout(func, 4)
      },
      () => {
        timeController.clearTimeout(handle)
      },
      () => {
        handle = timeControllerFilled.setTimeout(func, 4)
      },
      () => {
        timeControllerFilled.clearTimeout(handle)
      },
    )
    
    console.log(result)
  })
})
