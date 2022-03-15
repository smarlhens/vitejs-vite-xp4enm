import { PencilIcon } from '@heroicons/vue/solid';
import { mount } from '@vue/test-utils';
import { vi, test } from 'vitest';
import Menu from '../src/components/Menu.vue';

test('mount component', async () => {
  expect(Menu).toBeTruthy();

  const navigationItems = [
    {
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => vi.fn(),
    },
  ];

  const options = {
    props: {
      navigationItems,
    },
  };

  const wrapper = mount(Menu, options);
  const button = '[data-testid="menu-button"]';
  const menuItem = '[data-testid="menu-item-0"]';
  const spy = vi.spyOn(wrapper.vm.navigationItems[0], 'onClick');

  expect(wrapper.text()).toContain('Options');

  // should open menu
  await wrapper.get(button).trigger('click');

  // opened menu should contain menu item
  expect(wrapper.text()).toContain('Edit');

  await wrapper.get(menuItem).trigger('click');

  // should have been called on click
  expect(spy).toHaveBeenCalledTimes(1);

  vi.restoreAllMocks();
  wrapper.unmount();
});
