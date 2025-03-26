const baseUrl = 'http://localhost:3000'

export async function anotarsePartidoHandler(userId, partidoId) {}

export async function pagarCuotaHandler({ id }) {
  console.log(id)
  const res = await fetch(`${baseUrl}/borrachos/pagar`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    },
    body: JSON.stringify({
      id,
    }),
  })

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`)
  }

  const message = await res.json().then((obj) => obj.message)
  return message
}
