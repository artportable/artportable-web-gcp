import s from "./carousel.module.css";

export default function Carousel({ children, show, objects }) {
  return (
    <div className={s.container}>
      {children.map((child, index) => (
        <div
          className={objects[index] === show ? s.show : s.hidden}
          key={objects[index]}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
