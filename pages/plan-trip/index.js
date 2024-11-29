import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./planTrip.module.css";

export default function PlanTripPage() {
    const router = useRouter();
    const { destination } = router.query;
    const [tripDetails, setTripDetails] = useState({
      tripname: "",
      date: "",
      guests: 1,
      days: 1,
      transportation: "",
      accommodation: "",
      specialRequirements: ""
    });
    const [selectedDestination, setSelectedDestination] = useState(null);
  
    useEffect(() => {
      if (destination) {
        setSelectedDestination(JSON.parse(destination));
      }
    }, [destination]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTripDetails({ ...tripDetails, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
        const did=selectedDestination.id
        const tripinfo={...tripDetails,did}
        console.log(tripinfo)

        fetch('/api/booking',{
            method:'POST',
            body:JSON.stringify({
                tripdata:tripinfo
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json()).then(data=>console.log(data))

      alert("Trip booked successfully!");
      router.push("/history"); // Redirect to history page
    };
  
    if (!selectedDestination) return <p>Loading...</p>;
  
    return (
      <div className={styles.container}>
        <h1>Plan Your Trip to {selectedDestination.name}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Trip Name:</label>
          <input
            className={styles.input}
            type="text"
            name="tripname"
            placeholder={`My ${selectedDestination.name} Adventure`}
            value={tripDetails.tripname}
            onChange={handleChange}
            required
          />
          
          <label className={styles.label}>Travel Date:</label>
          <input
            className={styles.input}
            type="date"
            name="date"
            value={tripDetails.date}
            onChange={handleChange}
            required
          />
          
          <label className={styles.label}>Number of Guests:</label>
          <input
            className={styles.input}
            type="number"
            name="guests"
            min="1"
            value={tripDetails.guests}
            onChange={handleChange}
            required
          />
          
          <label className={styles.label}>Number of Days:</label>
          <input
            className={styles.input}
            type="number"
            name="days"
            min="1"
            value={tripDetails.days}
            onChange={handleChange}
            required
          />
          
          <label className={styles.label}>Transportation Preference:</label>
          <select 
            className={styles.input}
            name="transportation"
            value={tripDetails.transportation}
            onChange={handleChange}
            required
          >
            <option value="">Select Transportation</option>
            <option value="bus">Public Bus</option>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
          </select>
          
          <label className={styles.label}>Accommodation Type:</label>
          <select 
            className={styles.input}
            name="accommodation"
            value={tripDetails.accommodation}
            onChange={handleChange}
            required
          >
            <option value="">Select Accommodation</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="guesthouse">Guest House</option>
            <option value="camping">Camping</option>
          </select>
          
          <label className={styles.label}>Special Requirements/Notes:</label>
          <textarea
            className={styles.input}
            name="specialRequirements"
            value={tripDetails.specialRequirements}
            onChange={handleChange}
            placeholder="Any special requests or requirements?"
            rows="4"
          />
          
          <button className={styles.button} type="submit">Confirm Booking</button>
        </form>
      </div>
    );
}