import Image from 'next/image'
import { styles } from './artworkListItem.css'

export default function ArtworkListItem({ artwork }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img style={{height: '100%'}}
          key={artwork.PrimaryFile}
          src={`${bucketUrl}${artwork.PrimaryFile}`}
        />
      </div>
      <div className={s.titleAndLike}>
        <div>{artwork.Title}</div>
        <div>{artwork.Likes} Likes</div>
      </div>
    </div>
  );
}