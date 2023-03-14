import React from 'react'
import LogoStyles from './Logo.module.css'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/'>
      <div id={LogoStyles.logo}>
        <span>Honey</span>
      </div>
    </Link>
  )
}

export default Logo