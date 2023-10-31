import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/lib/next-auth/auth-options';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>{JSON.stringify(session?.user)}</div>
  )
}
