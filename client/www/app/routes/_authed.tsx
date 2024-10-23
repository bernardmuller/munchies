import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import useGetCurrentLoggedInUser from "@/lib/http/hooks/users/useGetCurrentLoggedInUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({context}) => {
    if (!context.user.userId) {
      throw redirect({
        to: '/sign-in',
      })
    }
  },
  component: () =>
    <QueryClientProvider client={queryClient}>
      <AuthenticatedComponent/>
    </QueryClientProvider>
})

function AuthenticatedComponent() {
  const userQuery = useGetCurrentLoggedInUser()

  if (!userQuery.data) {
    return <div>Loading...</div>
  }
  return (
    <AuthenticatedLayout user={userQuery.data}>
      <Outlet/>
    </AuthenticatedLayout>
  )
}