import Image from 'next/image'
import logo from '@/app/public/globe.png'

export function Header() {
  return (
    <header>
      <div className="logo-image-container">
        <Image src={logo} alt="logo-icon" layout="fill" objectFit="contain" />
      </div>
      <h1>My Travel Journal</h1>
    </header>
  )
}
