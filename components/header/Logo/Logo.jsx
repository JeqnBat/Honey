import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoStyles from './Logo.module.css'

const Logo = () => {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/')
  }
  
  return (
    <Link href='/'>
      <div id={LogoStyles.logo}>
        <span onClick={(e) => handleClick(e)}>Honey</span>
      </div>
    </Link>
  )
}

export default Logo