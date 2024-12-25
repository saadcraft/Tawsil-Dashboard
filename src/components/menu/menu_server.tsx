import React from 'react'
import Menu from './menu';
import { cookies } from 'next/headers';

export default async function MenuServer() {

    const access = (await cookies()).get('access_token')?.value;
    const refresh = (await cookies()).get('refresh_token')?.value;

  return (
    <div>
        <Menu access={access!} refresh={refresh!} />
    </div>
  )
}
