import { mount } from '@vue/test-utils'
import Login from '../components/Login.vue'
test('resets fields', async () => {
  const wrapper = mount(Login,  {
    propsData: {
      email: 'Abc@gmail.com',
      wachtwoord: 'something'
    }
  })

  await wrapper.find('button.reset').trigger('click')

  expect(wrapper.attributes().email.isEmpty())
  expect(wrapper.attributes().wachtwoord.isEmpty())
})