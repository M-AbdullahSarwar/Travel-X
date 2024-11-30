import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>TravelApp</h1>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/destinations">Destinations</Link></li>
          <li><Link href="/wishlist">Wishlist</Link></li>
          <li><Link href="/history">History</Link></li>
          {status === 'authenticated' ? (
            <>
              <li><Link href="/profile">Profile</Link></li>
              <li><a href="#" onClick={handleSignOut}>Sign Out</a></li>
            </>
          ) : (
            <li><Link href="/auth/signin">Sign In</Link></li>
          )}
        </ul>
      </nav>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

