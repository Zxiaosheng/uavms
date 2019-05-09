/** this is the device's router*/

import Layout from '@/layout'

const deviceRouter = {
  path: '/device',
  component: Layout,
  redirect: '/device/list',
  name: 'Device',
  meta: {
    title: 'device',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/device/dev-list'),
      name: 'DeviceList',
      meta: { title: 'deviceList' }
    },
    {
      path: 'add',
      component: () => import('@/views/device/dev-add'),
      name: 'DeviceAdd',
      meta: { title: 'addDevice' }
    },
    {
      path: 'test',
      component: () => import('@/components/Charts/RodeDynamic'),
      name: 'test',
      meta: { title: 'test' }
    },
    {
      path: 'test2',
      component: () => import('@/components/Charts/RodeFlyDynamic.vue'),
      name: 'test2',
      meta: { title: 'test2' }
    }
  ]
}

export default deviceRouter
