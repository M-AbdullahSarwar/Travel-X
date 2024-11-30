// components/Layout/Layout.js

import Link from "next/link";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>TravelApp</h1>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/destinations">Destinations</Link></li>
          <li><Link href="/wishlist">Wishlist</Link></li>
          <li><Link href="/history">History</Link></li>
          <li><Link href="/auth">Sign In</Link></li>
        </ul>
      </nav>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
