import Link from "@material-ui/core/Link";
import { styles } from "./indexEditorial.css";
import { useRouter } from "next/router";
import Image from "next/image";

export default function IndexEditorial() {
  const s = styles();
  const router = useRouter();

  return (
    <div className={s.container}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={s.wrapper}>
          <div>
            
            <Link href="https://artportable.com/editorial/jessica">
              <Image
                src={"/images/jessica2.jpg"}
                width={"600px"}
                height={"300px"}
                objectFit="cover"
                priority
                quality={10}
              />
            </Link>
          </div>
          <div className={s.titles}>
            {" "}
         
            <Link
              href="https://artportable.com/editorial/jessica"
              className={s.titleTwo}
            >
              Inredaren Jessica Spångberg om
              vikten av konst i kommersiella miljöer
            </Link>{" "}
 
          </div>
        </div>
        
        
     
      </div>

      <div className={s.wrapperTwo}>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
            <div>
              <Link href="https://artportable.com/editorial/ulric">
                <Image
                  src={"/images/ulricone.jpg"}
                  width={"600px"}
                  height={"300px"}
                  objectFit="cover"
                  priority
                  quality={10}
                />
              </Link>
            </div>
            <div className={s.titles}>
              {" "}
              <Link
                href="https://artportable.com/editorial/ulric"
                className={s.titleGrid}
              >
                Ulric Rudebeck – mellan landskap och linjer
              </Link>{" "}
           
          
            </div>
          </div>
        </div>{" "}
        <div className={s.wrapperGrid}>
        <div className={s.imageText}>
        <div>
        <Link href="https://artportable.com/editorial/fleurs">
              <Image
                src={"/images/fleursfour.jpg"}
                width={"600px"}
                height={"300px"}
                objectFit="cover"
                priority
                quality={10}
              />
            </Link>
            
          </div>
          <div className={s.titles}>
            {" "}
            
            <Link
              href="https://artportable.com/editorial/krib"
              className={s.titleGrid}
            >
              The Fleurs: På gränsen mellan dröm och verklighet
            </Link>{" "}
       
    
          </div>
        </div>
        </div>{" "}
        <div className={s.wrapperGrid}>
        <div className={s.imageText}>
        <div>
            <Link href="https://artportable.com/editorial/anita">
              <Image
                src={"/images/anitatwo.jpg"}
                width={"600px"}
                height={"300px"}
                objectFit="cover"
                priority
                quality={10}
              />
            </Link>
          </div>
          <div className={s.titles}>
            {" "}
            <Link
              href="https://artportable.com/editorial/anita"
              className={s.titleGrid}
            >
              Anita Nyberg – måleriets oväntade uppvaknande
            </Link>{" "}
        
     
          </div>
        </div>
        </div>{" "}
        <div className={s.wrapperGrid}>
        <div className={s.imageText}>
          <div>
            <Link href="https://artportable.com/editorial/krib">
              <Image
                src={"/images/kribone.jpg"}
                width={"600px"}
                height={"300px"}
                objectFit="cover"
                priority
                quality={10}
              />
            </Link>
          </div>
          <div className={s.titles}>
            {" "}
            <Link
              href="https://artportable.com/editorial/krib"
              className={s.titleGrid}
            >
              Krister ”KriB” Björklund
              målar inre landskap med global räckvidd
            </Link>{" "}
        
        
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
