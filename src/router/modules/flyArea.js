/** 飞行区域统计 **/

import Layout from '@/layout'

const userRouter = {
  path: '/flyArea',
  component: Layout,
  // alwaysShow:true,
  redirect: '/flyArea/index',
  name: 'flyArea',
  meta: {
    title: 'flyArea',
    icon: 'international'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/flyArea/index'),
      name: 'flyAreaList',
      meta: { title: 'flyAreaList' }
    },
    {
      path: 'bMap',
      component: () => import('@/views/flyArea/bMap'),
      name: 'bMap',
      meta: { title: 'bMap', noCache: true }
    }
  ]
}
export default userRouter
