const baseUrl = 'http://localhost:3000'

export async function crearPartidoHandler({ partido }) {
  const fechaHoraString = `${partido.fecha}T${partido.hora}:00`
  const fechaTimestamp = new Date(fechaHoraString).getTime().toString()

  const res = await fetch(`${baseUrl}/partidos`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    },
    body: JSON.stringify({
      fecha: fechaTimestamp,
      rival: partido.rival,
      cancha: partido.cancha,
      capacidad: partido.capacidad,
    }),
  })

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`)
  }

  const id = await res.json().then((obj) => obj.id)
  return id
}

export async function editarPartido({ partido }) {}

export async function eliminarPartidoHandler({ id }) {
  const res = await fetch(`${baseUrl}/partidos/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    },
  })

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`)
  }

  const message = await res.json().then((obj) => obj.message)
  return message
}
