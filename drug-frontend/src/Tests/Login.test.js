import { createLocalVue, mount } from '@vue/test-utils'
import Login from '../components/Login.vue'
import { BootstrapVue } from "bootstrap-vue";
// create an extended Vue constructor
const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)

// pass the localVue to the mount options

test('resets fields', async () => {
  const wrapper = mount(Login, {
    localVue,
    propsData: {
      email: 'Abc@gmail.com',
      wachtwoord: 'something'
    }
  })
  
  expect(wrapper.attributes().email).toMatch("Abc@gmail.com")
  expect(wrapper.attributes().wachtwoord).toMatch("something")

  await wrapper.find('#reset').trigger('click')

  expect(wrapper.attributes().email).toMatch("")
  expect(wrapper.attributes().wachtwoord).toMatch("")
})