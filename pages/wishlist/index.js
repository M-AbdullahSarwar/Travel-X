import DestinationCard from "@/components/Destination/destination";
import styles from "./wishlist.module.css";
import { useEffect, useState } from "react";

export default function WishlistPage (){
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    fetch('/api/wishlist').then(res =>res.json()).then(data => setWishlist(data.data))
    setLoading(false)
  },[])

  if (loading) {
       return <p>Loading...</p>;
    }
  console.log(wishlist)

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    fetch('./api/wishlist',{
        method:'DELETE',
        body:JSON.stringify({
            did:id
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => console.log(data))
  };

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
};