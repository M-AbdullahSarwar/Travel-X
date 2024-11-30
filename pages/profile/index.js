'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from './profile.module.css'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <h1 className={styles.title}>Profile</h1>
          
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <h3 className={styles.label}>Email</h3>
              <p className={styles.value}>{session?.user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleSignOut}
            className={styles.signOutButton}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

