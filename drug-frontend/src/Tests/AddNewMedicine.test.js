import { createLocalVue, mount } from '@vue/test-utils';
import AddNewMedicine from '../components/AddNewMedicine.vue';
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from 'vuelidate';
// create an extended Vue constructor
const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)
localVue.use(Vuelidate)
// pass the localVue to the mount options

test('Add new medicine not shown on page opening', async () => {
    const wrapper = mount(AddNewMedicine, {
        localVue
    })
    const modal = wrapper.getComponent({ ref: "modal" });
    expect(modal.vm.isVisible).toBe(false);
})

test('On click new medicine opens form', async () => {
    const wrapper = mount(AddNewMedicine, {
        localVue
    })
    const openButton = wrapper.find("#add-meds");
    await openButton.trigger("click")

    const modal = wrapper.getComponent({ ref: "modal" });
    expect(modal.vm.isVisible).toBe(true);
})

test('On no name input throw alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    const wrapper = mount(AddNewMedicine, {
        localVue,
        data() {
            return {
                name: '',
                description: 'This is a description!',
                static: true,
            }
        }
    })

    const openButton = wrapper.find("#add-meds");
    await openButton.trigger('click')

    const modal = wrapper.getComponent({ ref: "modal" });
    modal.vm.$emit('ok')
    expect(window.alert).toHaveBeenCalledWith("Vul de juiste waarden in voor het nieuwe medicijn!");
})

test('On short name input throw alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    const wrapper = mount(AddNewMedicine, {
        localVue,
        data() {
            return {
                name: '123',
                description: 'This is a description!',
                static: true,
            }
        }
    })

    const openButton = wrapper.find("#add-meds");
    await openButton.trigger('click')

    const modal = wrapper.getComponent({ ref: "modal" });
    modal.vm.$emit('ok')
    expect(window.alert).toHaveBeenCalledWith("Vul de juiste waarden in voor het nieuwe medicijn!");
})

test('On no description input throw alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    const wrapper = mount(AddNewMedicine, {
        localVue,
        data() {
            return {
                name: 'Alpha',
                description: '',
                static: true,
            }
        }
    })

    const openButton = wrapper.find("#add-meds");
    await openButton.trigger('click')

    const modal = wrapper.getComponent({ ref: "modal" });
    modal.vm.$emit('ok')
    expect(window.alert).toHaveBeenCalledWith("Vul de juiste waarden in voor het nieuwe medicijn!");
})

test('On too long description input throw alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    const wrapper = mount(AddNewMedicine, {
        localVue,
        data() {
            return {
                name: 'Alpha',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique id velit a feugiat. Vivamus efficitur, leo sed viverra feugiat sed.',
                static: true,
            }
        }
    })

    const openButton = wrapper.find("#add-meds");
    await openButton.trigger('click')

    const modal = wrapper.getComponent({ ref: "modal" });
    modal.vm.$emit('ok')
    expect(window.alert).toHaveBeenCalledWith("Vul de juiste waarden in voor het nieuwe medicijn!");
})