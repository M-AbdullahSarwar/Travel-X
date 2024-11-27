import style from './Destination.module.css'

export default function Destination(props) {
    

    return(
        <div>
            <div className={style.bookCard}>
      
            <div className={style.bookTitle}>{props.destination.name}</div>
            <div className={style.bookGenre}>Location: {props.destination.location}</div>
            <div className={style.bookGenre}>Category: {props.destination.category}</div>
            <div className={style.bookDescription}>{props.destination.description}</div>
            <div className={style.bookAuthor}>Activities: {props.destination.activities}</div>
            <div className={style.bookPrice}>{props.destination.price} PKR</div>
            <div className={style.bookRating}>Rating: {props.destination.rating}★</div>
            </div>
        </div>
    )
}