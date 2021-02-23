import Image from 'next/image'
import Link from 'next/link'
import s from './header.module.css'

export default function Header() {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <Link href="/">
                    <a>
                        <Image
                            src="/art-logo-TEMP.png"
                            alt="Logo Artportable"
                            width={188}
                            height={51}
                        />
                    </a>
                </Link>
            </div>
            <div className={s.navigation}>
                <Link href="/discover">
                    <a>Upptäck</a>
                </Link>
                <Link href="/about">
                    <a>Om oss</a>
                </Link>
            </div>
            <div className={s.language}>
                Swe
            </div>
        </div>
    );
}