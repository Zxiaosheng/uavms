/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/page',
  alwaysShow: true, // will always show the root menu
  name: 'user',
  meta: {
    title: 'user',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/user/manager',
      component: () => import('@/views/user/index'),
      name: 'userManager',
      meta: {
        title: 'userManager',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: '/user/map',
      component: () => import('@/views/user/map'),
      name: 'userMap',
      meta: {
        title: 'userMap',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
  ]
}

export default userRouter
