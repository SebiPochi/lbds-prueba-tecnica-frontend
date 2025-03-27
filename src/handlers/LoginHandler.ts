const baseUrl = 'http://localhost:3000'

export const loginHandler = async ({ email, password, store }: any) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  if (!res.ok) {
    const error = await res.json().then((obj) => obj.error)
    throw new Error(`Error ${res.status}: ${error}`)
  }

  const objRes = res.json()

  const token = await objRes.then((obj) => obj.token)
  const user = await objRes.then((obj) => obj.user)

  localStorage.setItem('access-token', await token)
  store.login(await user)
}
