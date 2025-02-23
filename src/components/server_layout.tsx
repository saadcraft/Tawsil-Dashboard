import { cookies } from 'next/headers';
import Menu from './menu/menu';
import { getUser } from '@/lib/auth';
import Header from './header/header';
import ContactSupport from './contact/contact-support';

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

  return (
    <div>
      <Menu user={users!} />
      <Header user={users!} token={access!} />
      {users && <ContactSupport />}
    </div>
  )

}
