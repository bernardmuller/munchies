// @ts-ignore
// / <reference types="vite/client" />
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute, redirect,
} from '@tanstack/react-router'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-start'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {
  Body,
  Head,
  Html,
  Meta,
  Scripts,
  createServerFn,
} from '@tanstack/start'
import * as React from 'react'
import { getAuth } from '@clerk/tanstack-start/server'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary.js'
import { NotFound } from '@/components/NotFound.js'
import appCss from '@/styles/app.css?url'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const fetchClerkAuth = createServerFn('GET', async (_, ctx) => {
  const user = await getAuth(ctx.request)

  return {
    user,
  }
})

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  links: () => [
    { rel: 'stylesheet', href: appCss },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
    { rel: 'icon', href: '/favicon.ico' },
  ],
  beforeLoad: async () => {
    const { user } = await fetchClerkAuth()

    return { user }
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {/*<div className="p-2 flex gap-2 text-lg">*/}
        {/*  <Link*/}
        {/*    to="/"*/}
        {/*    activeProps={{*/}
        {/*      className: 'font-bold',*/}
        {/*    }}*/}
        {/*    activeOptions={{ exact: true }}*/}
        {/*  >*/}
        {/*    Home*/}
        {/*  </Link>{' '}*/}
        {/*  <Link*/}
        {/*    to="/posts"*/}
        {/*    activeProps={{*/}
        {/*      className: 'font-bold',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Posts*/}
        {/*  </Link>*/}
        {/*  <div className="ml-auto">*/}
        {/*    <SignedIn>*/}
        {/*      <UserButton />*/}
        {/*    </SignedIn>*/}
        {/*    <SignedOut>*/}
        {/*      <SignInButton mode="modal" />*/}
        {/*    </SignedOut>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <hr />
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  )
}
