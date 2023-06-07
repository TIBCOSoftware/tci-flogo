import {expect, test} from '@oclif/test'

describe('tci:flogo:build-app', () => {
  test
  .stdout()
  .command(['tci:flogo:build-app'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['tci:flogo:build-app', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
