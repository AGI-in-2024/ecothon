'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/') // Redirect to home if not admin
    }
  }, [user, loading, router])

  if (loading || !user || user.role !== 'admin') {
    return <div>Loading...</div> // Or any loading component
  }

  return <>{children}</>
}