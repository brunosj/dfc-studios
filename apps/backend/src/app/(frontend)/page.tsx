import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Logo from '@assets/logo_transparent.svg'
import { getPayload } from 'payload'
import React from 'react'
import localFont from 'next/font/local'

import config from '@/payload.config'
import './styles.css'

const greycliff = localFont({
  src: [
    {
      path: '../../assets/fonts/greycliff-cf-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/greycliff-cf-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/greycliff-cf-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/greycliff-cf-demi-bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/greycliff-cf-extra-bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/greycliff-cf-medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
})

// Add width and height constants
const LOGO_WIDTH = 500
const LOGO_HEIGHT = 500

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home" style={{ fontFamily: greycliff.style.fontFamily }}>
      <div className="content">
        <div className="logo-container">
          <Image
            alt="DFC Studios logo"
            src={Logo}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
          />
        </div>
        {!user && <h3>Please login to continue</h3>}
        {user && (
          <h3>
            Welcome back, <span className="name">{user.name}</span>
          </h3>
        )}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            // target="_blank"
          >
            Go to admin panel
          </a>
        </div>
      </div>
    </div>
  )
}
