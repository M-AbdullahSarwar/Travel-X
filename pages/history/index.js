import { useEffect, useState } from "react";
import styles from "./history.module.css";
import { getAllDestinations } from "@/helper/api-util";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function HistoryPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if(!session){
    router.push('/auth/signin')
  }
  const [history, setHistory] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const filterHistory = (bookings) => {
      return bookings.filter(booking => booking.userId === session?.user?.id)
    }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking data
        const bookingResponse = await fetch('/api/booking');
        const bookingData = await bookingResponse.json();
        const result = filterHistory(bookingData.data)
        setHistory(result);

      
        // Fetch destination data
        const dest = await getAllDestinations();
        setDestinations(dest);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(destinations)
  console.log(history)

  // Match destination info with booking based on Destination ID (did)
  const getDestinationDetails = (did) => {
    return destinations.find(dest => dest.id === did) || {};
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Travelling History</h1>
      {history.length === 0 ? (
        <p>No trips booked yet!</p>
      ) : (
        <ul className={styles.list}>
          {history.map((booking, index) => {
            const destination = getDestinationDetails(booking.did);
            return (
              <li key={index} className={styles.item}>
                <h2>{booking.tripname}</h2>
                <p><strong>Destination:</strong> {destination.name || 'Unknown'}</p>
                <p><strong>Location:</strong> {destination.location || 'Unknown'}</p>
                <p><strong>Category:</strong> {destination.category || 'N/A'}</p>
                <p><strong>Activities:</strong> {destination.activities?.join(', ') || 'N/A'}</p>
                <p><strong>Rating:</strong> {destination.rating || 'N/A'} ★</p>
                <hr />
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p><strong>Days:</strong> {booking.days}</p>
                <p><strong>Transportation:</strong> {booking.transportation}</p>
                <p><strong>Accommodation:</strong> {booking.accommodation}</p>
                <p><strong>Special Requirements:</strong> {booking.specialRequirements || 'None'}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
