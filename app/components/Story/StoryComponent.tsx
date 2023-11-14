import Link from 'next/link';
import { styles } from './Story.css';
import { Story } from '../../models/Story';

import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

interface StoryComponentProps {
  story: Story;
}

export default function StoryComponent({ story }: StoryComponentProps) {
  const { t } = useTranslation('feed');
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const s = styles();
  const date: Date = new Date(story?.Published);
  const month1: string = date.toLocaleString('default', { month: 'short' });
  const month: string = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const day: string = date.toLocaleString('default', { day: 'numeric' });

  return (
    <article className={s.article}>
      <Link href={'/'}>
        <a>
          <img
            width={300}
            alt={`${story?.Title ? story?.Title : 'story image'}`}
            src={`${bucketUrl}${story?.PrimaryFile?.Name}`}
          />
        </a>
      </Link>
      <div>
        <header>
          <time>
            <div>
              <span>{month.toUpperCase()}</span>
              <span>{day}</span>
              {/* <span>{day}</span> */}
            </div>
          </time>
          <h2>
            <Link href={'/'}>
              <a>
                <time></time>
                {story?.Title}
              </a>
            </Link>
          </h2>
        </header>
        <div>
          <p>{story?.Description}</p>
        </div>
      </div>
    </article>
  );
}
