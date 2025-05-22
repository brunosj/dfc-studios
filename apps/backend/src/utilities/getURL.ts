import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return url
}

export const getClientSideURL = () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL

  if (process.env.NODE_ENV === 'development') {
    return url
  }

  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}
