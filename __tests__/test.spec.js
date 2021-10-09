import { shallowMount } from '@vue/test-utils'
import App from '@/app'

describe('test', () => {
  let app
  it('test', () => {
    app = shallowMount(App)
    console.log(app.html())
  })
});
