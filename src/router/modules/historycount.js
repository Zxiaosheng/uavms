/** 飞行区域统计 **/

import Layout from '@/layout'

const historycountRouter = {
    path: '/history-count',
    name: 'historycount',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'historycount',
      icon: 'chart',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
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
      },
    ]
  }
export default historycountRouter
