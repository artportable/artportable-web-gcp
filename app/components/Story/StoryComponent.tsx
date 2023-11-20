import Link from 'next/link';
import { styles } from './storyComponent.css';
import { Story } from '../../models/Story';

interface StoryComponentProps {
    story: Story;
}

export default function StoryComponent({ story }: StoryComponentProps) {
    const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
    const s = styles();
    const date: Date = new Date(story?.Published);
    const month: string = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day: string = date.toLocaleString('default', { day: 'numeric' });

    return (
        <article className={s.story}>
            <Link href={`/story/${story.Id}`}>
                <a>
                    <img
                        style={{ maxWidth: '100%' }}
                        alt={`${story?.Title ? story?.Title : 'story image'}`}
                        src={`${bucketUrl}${story?.PrimaryFile?.Name}`}
                    />
                </a>
            </Link>
            <div className={s.textTitle}>
                <header>
                    <time dateTime={date.toISOString()} className={s.datePublished}>
                        <div className={s.monthDay}>
                            <span className={s.month}>{month}</span>
                            <span className={s.day}>{day}</span>
                        </div>
                    </time>
                    <h2 className={s.title}>
                        <Link href={`/story/${story.Id}`}>
                            <a>
                                <time></time>
                                {story?.Title}
                            </a>
                        </Link>
                    </h2>
                </header>
                {story.Description.length > 200 ? (
                    <p className={s.text}>{story?.Description.slice(0, 200).trimEnd()}...</p>
                ) : (
                    <p className={s.text}>{story?.Description}</p>
                )}
            </div>
        </article>
    );
}
