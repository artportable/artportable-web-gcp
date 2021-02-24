import s from './carousel.module.css'
import Link from "next/link";
// import Router from "next/router";

export default function Carousel(props) {
    return (
        <div className={s.slider}>
            {props.children.map((value, index) => 
                <Link href={"#slide-" + (index + 1)} scroll={false}>
                    <a>{value}</a>
                </Link>    
            )}

            <div className={s.slides}>

                {props.children.map((value, index) => 
                    <div id={"slide-" + (index + 1)}>{value}</div>
                )}

            </div>
        </div>
    );
}