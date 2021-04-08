import Image from 'next/image'
import { styles } from './artworkListItem.css'

export default function ArtworkListItem({ artwork }) {
  console.log(artwork);
  const s = styles();
  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/'; // TODO: Fetch from config
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <Image 
          key={artwork.PrimaryFile}
          src={`${bucketUrl}${artwork.PrimaryFile}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={s.titleAndLike}>
        <div>{artwork.Title}</div>
        <div>{artwork.Likes} Likes</div>
      </div>
    </div>
  );
}