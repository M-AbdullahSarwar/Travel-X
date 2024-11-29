import DestinationCard from "../Destination/destination";
import styles from "./FeaturedDestinations.module.css";

const FeaturedDestinations = (props) => {
  const featured = props.destinations.filter((destination) => destination.rating >= 4.5);

  return (
    <div className={styles.featuredContainer}>
      <h2 className={styles.mainHeading}>Featured Destinations</h2>
      <div className={styles.grid}>
        {featured.length > 0 ? (
          featured.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <p>No featured destinations available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
