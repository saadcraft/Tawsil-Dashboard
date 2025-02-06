import { cookies } from 'next/headers';
import Menu from './menu/menu';
import { getUser } from '@/lib/auth';
import Header from './header/header';
import ContactSupport from './contact/contact-support';
import { getTotalDemande } from '@/lib/action_client';

export default async function ServerMenu() {

  const access = (await cookies()).get("access_token")?.value
  // const refresh = (await cookies()).get("refresh_token")?.value



  let users;
  if (access) {
    try {
      users = await getUser()
    } catch {
      users = null
    }
  }

  const num = await getTotalDemande()

  return (
    <div>
      <Menu user={users!} count={num!} />
      <Header user={users!} />
      {users && <ContactSupport />}
    </div>
  )

}
