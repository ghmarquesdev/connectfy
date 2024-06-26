import type { Metadata } from 'next'

import { searchUsers } from '@/http/search-users'
import { Grid } from '@/components/pages/search/users/grid'

export const metadata: Metadata = {
  title: 'Usuários | connectify',
}

type UsersProps = {
  searchParams: {
    q: string
    page?: number
  }
}

export default async function Users({ searchParams: { q, page } }: UsersProps) {
  const users = await searchUsers({
    query: q,
    page,
  })

  if (!users) {
    return <p>loading...</p>
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
      <Grid users={users.users} meta={users.meta} />
    </section>
  )
}
