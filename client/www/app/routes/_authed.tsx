import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import useAppData from "@/lib/http/hooks/app-data/useAppData";
import {Loader2} from "lucide-react";
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({context}) => {
    if (!context.user.userId) {
      throw redirect({
        to: '/sign-in',
      })
    }
  },
  component: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthenticatedComponent/>
        <ReactQueryDevtoolsPanel/>
      </QueryClientProvider>
    )
  }
})

function AuthenticatedComponent() {
  const {isFetching, currentUser} = useAppData()
  if (isFetching) {
    return <div className="w-full h-full flex flex-col items-center justify-center bg-header text-gray-100">
      <Loader2
        className="w-16 h-16 animate-spin"
      />
      <span className="text-2xl font-bold">Loading...</span>
    </div>
  }
  return (
    <AuthenticatedLayout user={currentUser}>
      <Outlet/>
    </AuthenticatedLayout>
  )
}