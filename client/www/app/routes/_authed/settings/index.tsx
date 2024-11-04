import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/settings/')({
  beforeLoad: () => {
    return redirect({
      to: '/settings/profile',
    })
  }
})
