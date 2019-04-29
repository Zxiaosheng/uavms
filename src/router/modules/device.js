/** this is the device's router*/

import Layout from '@/layout'

const deviceRouter = {
  path: '/device',
  component: Layout,
  redirect: '/device/device-list',
  name: 'Device',
  meta: {
    title: '设备管理',
    icon: 'form'
  },
  children: [
    {
      path: 'device-list',
      component: () => import('@/views/device/dev-list'),
      name: 'DeviceList',
      meta: { title: '设备列表' }
    },
    {
      path: 'device-list',
      component: () => import('@/views/device/dev-list'),
      name: 'DeviceList',
      meta: { title: '设备列表' }
    }
  ]
}

export default deviceRouter
