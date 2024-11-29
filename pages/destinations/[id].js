import React, { useEffect, useState } from "react";
import styles from "./DestinationDetail.module.css";
import { getAllDestinations } from "@/helper/api-util";
import { useRouter } from "next/router";


const ACCESS_KEY = 'RMWbFcJe7fN7Nw_7H62xvqbt6KctKrBAeQSbRCAlJhk'; // Replace with your Unsplash API access key

export default function DestinationDetail(props){
    if (!props.destinationsdetail) {
    return <p>Loading</p>;
    }
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${props.destinationsdetail.name}&client_id=${ACCESS_KEY}`);
        const data = await response.json();
        if (data.results.length > 0) {
            setImageUrl(data.results[0].urls.regular);
        }
    };
    fetchImage();
  }, [props.destinationsdetail]);


  const [wishlistAdded, setWishlistAdded] = useState(false);
  const router = useRouter();
  const btnhandler1 = (e) => {
      e.stopPropagation(); // Prevent card click
      router.push({
          pathname: "/plan-trip",
          query: { destination: JSON.stringify(props.destinationsdetail) },
      });
  };

  const btnhandler2 = (e) => {
      e.stopPropagation(); 
      console.log(props.destinationsdetail);
      
      fetch('/api/wishlist', {
          method: 'POST',
          body: JSON.stringify({
              wishlistdata: props.destinationsdetail
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res => res.json()).then(data => setWishlistAdded(data.value));

      alert("Added to Wishlist!");
  };


  return (
    <div className={styles.container}>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={props.destinationsdetail.name} 
          className={styles.image} 
        />
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{props.destinationsdetail.name}</h1>
        <p className={styles.location}><strong>Location:</strong> {props.destinationsdetail.location}</p>
        <p className={styles.category}><strong>Category:</strong> {props.destinationsdetail.category}</p>
        <p className={styles.description}><strong>Description:</strong> {props.destinationsdetail.description}</p>
        <p className={styles.activities}><strong>Activities:</strong> {props.destinationsdetail.activities.join(', ')}</p>
        <p className={styles.price}><strong>Price:</strong> {props.destinationsdetail.price} PKR</p>
        <p className={styles.rating}><strong>Rating:</strong> {props.destinationsdetail.rating}★</p>

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
    </div>
  );
};
export async function getStaticProps(context) {
    const destinations=await getAllDestinations();
    if(!destinations || destinations.length === 0)
        return { notFound: true}
  
    const destination = destinations.find((dest) => dest.id === parseInt(context.params.id));

    if(!destination){
        return{
            notFound:true
        }
    }
    return{
        props:{
            destinationsdetail:destination
        }
    }
}

export async function getStaticPaths(){
    const destinations = await getAllDestinations();
    console.log(destinations)

    if(!destinations || destinations.length === 0)
        return {
            paths: [],
            fallback: false,
          };
  
    const ids = destinations.map(i => i.id)
    const paths = ids.map(i => ({
        params:{
            id:i.toString()
        }
    }))

    return{
        paths:paths,
        fallback:true,
    }
}