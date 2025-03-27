const baseUrl = 'http://localhost:3000'

export async function anotarsePartidoHandler({ borrachoId, partidoId }) {
  const res = await fetch(`${baseUrl}/borrachos/anotarse`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    },
    body: JSON.stringify({
      borrachoId,
      partidoId,
    }),
  })

  if (!res.ok) {
    const error = await res.json().then((obj) => obj.error)
    throw new Error(`Error ${res.status}: ${error}`)
  }

  const partidosAnotado = await res.json().then((obj) => obj.partidosAnotado)
  return partidosAnotado
}

export async function pagarCuotaHandler({ id }) {
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
    const error = await res.json().then((obj) => obj.error)
    throw new Error(`Error ${res.status}: ${error}`)
  }

  const message = await res.json().then((obj) => obj.message)
  return message
}

export async function getBorracho({ id }) {
  const res = await fetch(`${baseUrl}/borrachos/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    },
  })

  if (!res.ok) {
    const error = await res.json().then((obj) => obj.error)
    throw new Error(`Error ${res.status}: ${error}`)
  }

  const borracho = await res.json().then((obj) => obj.borracho)

  return borracho
}
