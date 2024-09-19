import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export function Navigation() {
  const { user, isAuthorized } = useAuth()
  
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">EcoApp</Link>
        <div className="space-x-4">
          <Link href="/events" className="text-white hover:text-green-200">События</Link>
          <Link href="/map" className="text-white hover:text-green-200">Карта</Link>
          <Link href="/communities" className="text-white hover:text-green-200">Сообщества</Link>
          <Link href="/knowledge" className="text-white hover:text-green-200">База знаний</Link>
          {isAuthorized(['organizer', 'admin']) && (
            <Link href="/organizer-dashboard" className="text-white hover:text-green-200">Панель организатора</Link>
          )}
          {isAuthorized(['admin']) && (
            <Link href="/admin" className="text-white hover:text-green-200">Панель администратора</Link>
          )}
        </div>
      </div>
    </nav>
  )
}