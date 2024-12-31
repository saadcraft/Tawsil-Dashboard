import { cookies } from 'next/headers';
import Menu from './menu';

export default async function ServerMenu() {

    const access = (await cookies()).get("access_token")?.value
    const refresh = (await cookies()).get("refresh_token")?.value

  return (
    <div>
        <Menu token={access!} remove={refresh!} />
    </div>    
  )
}
