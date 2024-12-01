import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./Destination.module.css";
import { useRouter } from "next/router";

const DestinationCard = ({ destination }) => {
    const { data: session } = useSession();
    const { name, location, category, description, activities, price, rating } = destination;
    const activitiesList = Array.isArray(activities) ? activities : (activities ? [activities] : []);
    const router = useRouter();
    const [wishlistAdded, setWishlistAdded] = useState(false);

    const handleCardClick = () => {
        router.push(`/destinations/${destination.id}`);
    };

    const btnhandler1 = (e) => {
        e.stopPropagation();
        router.push({
            pathname: "/plan-trip",
            query: { destination: JSON.stringify(destination) },
        });
    };

    const btnhandler2 = async (e) => {
        e.stopPropagation();
        
        if (!session) {
            router.push('/auth/signin');
            return;
        }
        const wishlistitem={
            id:destination.id,
            name: destination.name,
            location: destination.location,
            category: destination.category,
            description: destination.description,
            activities: destination.activities,
            price: destination.price,
            rating: destination.rating,
           // userId: session.user.id,
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                body: JSON.stringify({
                    //wishlistdata: {...destination,userId: session?.user?.id}
                    wishlistdata: wishlistitem
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to wishlist');
            }

            setWishlistAdded(data.value);
            alert(data.message);
        } catch (error) {
            alert(error.message);
            if (error.message.includes('sign in')) {
                router.push('/auth/signin');
            }
        }
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
            >
                Add to Wishlist
            </button>
        </div>
    );
};

export default DestinationCard;



