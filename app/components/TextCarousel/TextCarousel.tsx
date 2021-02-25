import Carousel from '../Carousel/Carousel'
import s from './text-carousel.module.css'

export default function TextCarousel({ show, objects }) {
  const navOptions = objects.map(object => object.tag)
  return (
    <Carousel show={show} objects={navOptions}>
      {objects.map(object => 
        <div className={s.textContainer} key={object.tag}>
          <div>{object.text} </div>
          <div className={s.tag}>{object.tag}</div>
        </div>
      )}
    </Carousel>
  );
}