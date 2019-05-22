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
    icon: 'tab'
  },
  children: [
    // {
    //   path: 'index',
    //   component: () => import('@/views/flyArea/index'),
    //   name: 'flyAreaList',
    //   meta: { title: 'flyAreaList' }
    // },
    {
      path: 'index',
      component: () => import('@/views/flyArea/flyAreaBackPage.vue'),
      name: 'flyAreaList',
      meta: { title: 'flyAreaList' }
    },
    {
      path: 'bMap',
      component: () => import('@/views/flyArea/bMap'),
      name: 'bMap',
      meta: { title: 'bMap', noCache: true }
    },
    {
      path: 'index1',
      name: 'historycountlist',
      component: () => import('@/views/history-count'),
      meta: {
        title: 'historycountlist',
        roles: ['admin']
      }
    },
    {
      path: 'count-echart',
      name: 'historycountechart',
      component: () => import('@/views/history-count/count-echart'),
      meta: {
        title: 'historycountechart',
        roles: ['admin']
      }
    }
    // {
    //   path: 'line',
    //   component: () => import('@/views/flyArea/line'),
    //   name: 'line',
    //   meta: { title: 'line', noCache: true }
    // }
  ]
}
export default userRouter
