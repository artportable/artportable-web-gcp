import { useTranslation } from 'next-i18next';
import Carousel from '../Carousel/Carousel'
import s from './text-carousel.module.css'

export default function TextCarousel({ show, items }) {
  const { t } = useTranslation(['index', 'tags']);

  const tags = items.map(i => i.tag);

  return (
    <Carousel show={show} objects={tags}>
      {items.map(item =>
        <div className={s.textContainer} key={item.tag}>
          <div>
            {t('index:' + item.text)}
          </div>
          <div className={s.tag}>
            {t('tags:' + item.tag)}
          </div>
        </div>
      )}
    </Carousel>
  );
}