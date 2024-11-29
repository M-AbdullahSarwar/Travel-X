import FeaturedDestinations from "@/components/FeaturedDestinations/featured_destinations";
import styles from './home.module.css'
import { getAllDestinations } from "@/helper/api-util";


export default function HomePage(props){
  return (
    <div>
      <h1 className={styles.mainHeadings}>Welcome to the Travel App</h1>
      { <FeaturedDestinations destinations={props.destinations} />}
    </div>
  );
};

export async function getStaticProps() {
  const destinations = await getAllDestinations()

  if(!destinations || destinations.length === 0)
      return { notFound: true}

  return{
      props: {
          destinations: destinations
      },
      revalidate: 100
  }
}