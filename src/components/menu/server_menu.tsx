import { cookies } from 'next/headers';
import Menu from './menu';
import { getUser } from '@/lib/auth';

export default async function ServerMenu() {

    const access = (await cookies()).get("access_token")?.value
    // const refresh = (await cookies()).get("refresh_token")?.value

  

  let users;
  if(access){
  try{
    users = await getUser()
  }catch{
      users = null
  }
}

  return (
    <div>
        <Menu user={users!} />
    </div>
  )

}
