/** this is task module routes**/

import Layout from '@/layout'

const taskRouter = {
  path: '/taskcenter',
  component: Layout,
  alwaysShow: true,
  name: 'taskCenter',
  meta: {
    title: 'taskCenter',
    icon: 'excel',
    roles: ['admin']
  },
  children: [
    {
      path: 'tasklist',
      name: 'taskList',
      component: () => import('@/views/task'),
      meta: {
        title: 'taskList',
        roles: ['admin']
      }
    },
    {
      path: 'taskboard',
      name: 'taskBoard',
      component: () => import('@/views/task/taskboard'),
      meta: {
        title: 'taskBoard',
        roles: ['admin']
      }
    }
  ]
}
export default taskRouter
