import {createFileRoute, Link} from '@tanstack/react-router'
import {fetchPosts} from '@/lib/utils/posts.js'
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/tanstack-start";

export const Route = createFileRoute('/_authed/posts')({
  loader: () => fetchPosts(),
  component: PostsComponent,
})

function PostsComponent() {
  const posts = Route.useLoaderData()

  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{exact: true}}
        >
          Home
        </Link>{' '}
        <Link
          to="/posts"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Posts
        </Link>
        <div className="ml-auto">
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            {/*<SignInButton mode="modal"/>*/}
          </SignedOut>
        </div>
      </div>
      <div className="p-2 flex gap-2">
        <ul className="list-disc pl-4">
          {[...posts, {id: 'i-do-not-exist', title: 'Non-existent Post'}].map(
            (post) => {
              return (
                <li key={post.id} className="whitespace-nowrap">
                  <Link
                    to="/posts/$postId"
                    params={{
                      postId: post.id,
                    }}
                    className="block py-1 text-blue-800 hover:text-blue-600"
                    activeProps={{className: 'text-black font-bold'}}
                  >
                    <div>{post.title.substring(0, 20)}</div>
                  </Link>
                </li>
              )
            },
          )}
        </ul>
        <hr/>
        {/*<Outlet />*/}
      </div>
    </>

  )
}
