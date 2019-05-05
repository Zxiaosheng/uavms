/** 飞行区域统计 **/

import Layout from '@/layout'

const historycountRouter = {
    path: '/history-count',
    name: 'historycount',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'history-count',
      icon: 'chart',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'historycountlist',
        component: () => import('@/views/history-count'),
        meta: {
          title: 'history-count-list',
          roles: ['admin']
        }
      },
      {
        path: 'count-echart',
        name: 'historycountechart',
        component: () => import('@/views/history-count/count-echart'),
        meta: {
          title: 'countechart',
          roles: ['admin']
        }
      },
    ]
  }
export default historycountRouter
