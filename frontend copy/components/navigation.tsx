import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export function Navigation() {
  const { user } = useAuth()
  
  return (
    <nav>
      {/* ... existing navigation items ... */}
      {user && user.role === 'admin' && (
        <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Панель администратора
        </Link>
      )}
    </nav>
  )
}