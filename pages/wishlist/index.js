import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DestinationCard from "@/components/Destination/destination";
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchWishlist();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchWishlist = async () => {
    const res = await fetch('/api/wishlist');
    const data = await res.json();
    setWishlist(data.data);
    setLoading(false);
  };

  const removeFromWishlist = async (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    await fetch('./api/wishlist', {
      method: 'DELETE',
      body: JSON.stringify({
        did: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    fetchWishlist();
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please sign in to view your wishlist.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className={styles.grid}>
          {wishlist.map((destination) => (
            <div key={destination.id}>
              <DestinationCard destination={destination} />
              <button
                onClick={() => removeFromWishlist(destination.id)}
                className={styles.removeButton}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}

