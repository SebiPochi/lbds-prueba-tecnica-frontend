'use client'

import { useUserStore } from '@/stores/user'

const baseUrl = 'http://localhost:3000'

export const loginHandler = async ({ email, password, store }: any) => {
  try {
    const user = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((u) => u.user)

    console.log(user)
    store.login(user)
  } catch (e) {}
}
