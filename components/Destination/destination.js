import { useState } from "react";
import styles from "./Destination.module.css"; // We'll create this CSS module next
import { useRouter } from "next/router";

const DestinationCard = ({ destination }) => {
    const { name, location, category, description, activities, price, rating } = destination;

    // Convert activities to an array if it's not already one
    const activitiesList = Array.isArray(activities) ? activities : (activities ? [activities] : []);
    const router = useRouter();
    const handleCardClick = () => {
        router.push(`/destinations/${destination.id}`);
    };

    const [wishlistAdded, setWishlistAdded] = useState(false);

    const btnhandler1 = (e) => {
        e.stopPropagation(); // Prevent card click
        router.push({
            pathname: "/plan-trip",
            query: { destination: JSON.stringify(destination) },
        });
    };

    const btnhandler2 = (e) => {
        e.stopPropagation(); 
        console.log(destination);
        
        fetch('/api/wishlist', {
            method: 'POST',
            body: JSON.stringify({
                wishlistdata: destination
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setWishlistAdded(data.value));

        alert("Added to Wishlist!");
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <h2 className={styles.cardTitle}>{name}</h2>
            <p className={styles.cardDescription}><strong>Location:</strong> {location}</p>
            <p className={styles.cardDescription}><strong>Category:</strong> {category}</p>
            <p className={styles.cardDescription}>{description}</p>
            <p className={styles.cardDescription}>
                <strong>Activities:</strong> {activitiesList.join(", ")}
            </p>
            <p className={styles.cardDescription}><strong>{price} PKR</strong></p>
            <p className={styles.cardDescription}><strong>Rating:</strong> {rating}★</p>

            <button className={styles.BookDestinationButton} onClick={btnhandler1}>
                Book Destination
            </button>

            <button 
                className={styles.wishlistButton} 
                onClick={btnhandler2} 
                disabled={wishlistAdded} // Disable the button if wishlistAdded is true
            >
                {wishlistAdded ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
    );
};

export default DestinationCard;