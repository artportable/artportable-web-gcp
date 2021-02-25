import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './header.module.css'

export default function Header() {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <Link href="/">
                    <a>
                        <Image
                            src="/art-logo-TEMP.PNG"
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
                <FontAwesomeIcon icon="chevron-down" />
            </div>
        </div>
    );
}