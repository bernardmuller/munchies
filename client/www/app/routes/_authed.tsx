import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({context}) => {
    if (!context.user.userId) {
      throw redirect({
        to: '/sign-in',
      })
    }
  }
})
