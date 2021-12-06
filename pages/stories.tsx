import { styles } from '../styles/stories.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Plans() {
  const { t } = useTranslation(['plans', 'common']);
  const s = styles();

  const people = [
    { id: 1, 
      heading: "Ann Kristin Grønolens bergsmotiv bjuder betraktaren på en abstrakt twist", 
      preamble: "Målandet för Ann Kristin Grønolen tog fart som en distraktion från hennes hektiska vardag. Med sina penseldrag lyckas hon koppla bort från stress, prestation och känner total frihet i ett obegränsat flöde av vad som kan dyka upp på målarduken.", 
      image: '/images/bild1.jpg',
      publish: "2021.12.22"},
    { id: 2, 
      heading: "Mårten Lundgren – “Det går inte att förneka att vi människor har något band till naturen”",
      preamble: "Mårten Lundgrens fotografier är klassiska skildringar av svenska skogsdjur insvepta i ett lager av abstrakt subjektivitet: “När jag fotar försöker jag jobba med min egna upplevelse av naturen. Det är viktigt att det inte bara blir en bild på ett djur, exempelvis en älg, utan jag försöker hitta individen.” Just nu går det att se Mårtens fotokonst på Artportables showroom.",
      image: '/images/bild2.jpg',
      publish: "2021.12.22"},
    { id: 3, 
      heading: "Olle Brandqvist modellerar fram människans mystiska relation till naturen",
      preamble: "Med sina gåtfulla skulpturer i sten och tenn alstrar konstnären Olle Brandqvist fram frågor om människans inre förbindelse med naturen han själv inte har svaren på. Istället lämnar han tolkningsfriheten åt betraktaren. Längsmed hans finmodellerade landskap av tenn med lödkolv tillåter han därmed den mänskliga mystiken att fortsätta.",
      image: '/images/bild3.jpg',
      publish: "2021.12.22"},
    { id: 3, 
      heading: "Atle Reilo om konsten att framkalla den okända faktorn med döden",
      preamble: "Alla penseldrag har en präglande historia att berätta. För den expressionistiska konstnären Atle Reilo är det ett långt liv där tuffa bortgångar inom familjen gjort djupa sår och påverkat skapandeprocessen. Sår som lämnas öppna för betraktaren att studera och även väcker frågor om livet efter döden.",
      image: '/images/bild4.jpg',
      publish: "2021.12.22"},
  ];
  
  const first = people[0];
  const second = people[1];
  const third = people[2];
  const fourth = people[3];


  return (
  <div>
  <div
    className={s.firstItem} 
    style={{backgroundImage: `url(${first.image})`}}>
      <div className={s.containerFirstItem}>
      <p className={s.publishFirstItem}>{first.publish}</p>
      <div>
      <h1 className={s.headingFirstItem}>{first.heading}</h1>
      <p className={s.preambleFirstItem}>{first.preamble}</p>
      </div>
      </div>
  </div>
  {/* {people.map(article => {
    return (
      <div key={article.id}>
        <img src={article.image}/>
        <h1>{article.heading}</h1> 
        <p>{article.preamble}</p>
      </div>
    )
  })} */}
</div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'support', 'footer', 'support', 'common', 'plans']),
    }
  };
}