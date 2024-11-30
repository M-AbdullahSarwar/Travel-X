import React, { useState } from "react";
import DestinationCard from '@/components/Destination/destination';
import FilterBar from "@/components/FilterBar/FilterBar";
import styles from "../home.module.css";
import {getAllDestinations} from "@/helper/api-util";

export default function DestinationsPage (props){
  
    const [filteredDestinations, setFilteredDestinations] = useState(props.destinations);

    const handleFilter = ({ searchTerm, priceRange, location, minRating }) => {
      const filtered = props.destinations.filter((destination) => {
        const matchesSearchTerm = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          destination.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesPrice = priceRange ? destination.price <= parseInt(priceRange) : true;
        const matchesLocation = location ? destination.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesRating = minRating ? destination.rating >= parseFloat(minRating) : true;
  
        return matchesSearchTerm && matchesPrice && matchesLocation && matchesRating;
      });
     
        setFilteredDestinations(filtered);
    };
  
    return (
      <div className={styles.container}>
        <h1 className={styles.mainHeadings}>All Destinations</h1>
        <FilterBar onFilter={handleFilter} />
        <div className={styles.grid}>
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          ) : (
            <p>No destinations match your criteria.</p>
          )}
        </div>
      </div>
    );
};
// export async function getServerSideProps() {
//     const destinations =  await getAllDestinations()

//     if(!destinations || destinations.length === 0)
//         return { notFound: true}

//     return{
//         props: {
//             destinations: destinations
//         }
//     }
// }

export async function getStaticProps() {
  const destinations =  await getAllDestinations()

  if(!destinations || destinations.length === 0)
      return { notFound: true}

  return{
      props: {
          destinations: destinations
      }
  }
}