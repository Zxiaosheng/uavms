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
      path: 'demo',
      component: () => import('@/views/charts/FlyRoute'),
      name: 'fly-rote-demo',
      meta: { title: '飞行路径演示' }
    }
  ]
}

export default deviceRouter
