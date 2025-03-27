const baseUrl = 'http://localhost:3000'

export const registerHandler = async ({ nombre, apellido, email, password, store }: any) => {
  const res = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre,
      apellido,
      email,
      password,
    }),
  })

  if (!res.ok) {
    const error = await res.json().then((obj) => obj.error)
    throw new Error(`Error ${res.status}: ${error}`)
  }
}
