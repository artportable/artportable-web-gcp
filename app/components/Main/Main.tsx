import s from './main.module.css'

export default function Main({ children }) {
    return (
        <div className={s.container}>
            <div className={s.content}>
                {children}
            </div>
        </div>
    );
}