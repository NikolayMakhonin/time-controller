import funcEsDefault, {funcEs} from 'src/test/module-es'
// eslint-disable-next-line node/no-extraneous-import
import funcCjs from 'assets'

describe('test', function () {
  it('test', function () {
    assert.strictEqual(funcEs(), 'funcEs')
    assert.strictEqual(funcEsDefault(), 'funcEsDefault')
    assert.strictEqual(funcCjs(), 'funcEsDefault, funcEs, funcCjs')
    console.log('OK')
  })
})
