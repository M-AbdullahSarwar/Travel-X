
import styles from '../Home.module.css'
import Destination from '@/components/Destination/destination';

export default function AllDestinationsPage({destinations}) {
    return(
        <div className={styles.container}>
            <header className={styles.header}>All Destinations</header>

            {/* Add Filters Here */}

            <div className={styles.destinationList}>
            {destinations.map((dest) =>{
                return (
                    <Destination destination={dest} />
                    // <p>{dest.name}</p>
                );
            })}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // const { getAllDestinations } = require('@/helper/api-util');         // see how to do this
    // const destinations = await getAllDestinations()

    const response = await fetch('http://localhost:3000/api/destinations')
    const data = await response.json()


    if(!data.destinations || data.destinations.length === 0)
        return { notFound: true}

    return{
        props: {
            destinations: data.destinations
        },
        revalidate: 100
    }
}