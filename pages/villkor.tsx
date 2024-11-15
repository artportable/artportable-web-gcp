import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Main from "../app/components/Main/Main";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { styles } from "../styles/villkor.css";

export default function GdprPage({ navBarItems }) {
  const mdPlusScreenOrDown = useBreakpointDown("mdPlus");
  const { t } = useTranslation(["gdpr"]);
  const s = styles();

  return (
    <>
      <Main wide={mdPlusScreenOrDown ? true : false} navBarItems={navBarItems}>
        <Paper title={t("title")} className={s.gdprContainer}>
          <div className={s.textDiv}>
            <h2>Villkor</h2>
            <p>
              Dessa användarvillkor nedan reglerar förhållandet mellan dig och
              Artportable och påverkar dina legala rättigheter och skyldigheter.
              Vänligen läs igenom.
            </p>
            <h4>Åldersgräns och kontoberättigande</h4>
            <p>
              1.1. För att vara berättigad att ingå avtal med Artportable och
              starta ett abonnemang måste du vara minst 18 år gammal och/eller i
              övrigt vara behörig att ingå avtal och godkänna att bli bunden av
              villkoren.
            </p>
            <p>
              1.2. Du måste förse Artportable med korrekt information om dig
              själv vid registreringen av ett konto hos oss, inklusive
              kontaktinformation till dig, samt en giltig betalningsmetod.
            </p>
            <h4>2. Produkt</h4>
            <p>
              2.1. Artportable tillhandahåller en digital abonnemangsprodukt
              genom vilken du som abonnent kan publicera din portfolio.
              Artportable kan även från tid till annan erbjuda tillgång till
              olika typer av sociala medieforum, vilka kan vara öppna för of
              entligheten, i syfte att ytterligare förbättra och berika
              marknadsföring av ditt konstnärskap.
            </p>
            <p>
              2.2. För att kunna nyttja produkten måste du använda en
              internetuppkopplad enhet som är kompatibel med Artportables
              tekniska krav. Kund åtar sig att vid varje tidpunkt ha tillgång
              till erfoderlig mjukvara för att använda{" "}
              <a href="artportables.com">
                <span style={{ color: "blue" }}>artportables.com</span>
              </a>{" "}
              produkter. Du måste också tillhandahålla oss eller vår partner
              ditt val av betalningsmetod bland de betalningsmetoder som
              godkänns av Artportable från tid till annan. För en fullständig
              och uppdaterad lista över de tekniska kraven, Artportables
              partners samt de aktuella godkända betalningsmetoderna som finns
              på Artportables hemsida. Artportable förbehåller sig dock rätten
              att, från tid till annan, ändra de tekniska kraven för att nyttja
              produkten och för att ändra, lägga till eller ta bort partners och
              betalningsmetoder. Artportable förbehåller sig rätten att, när som
              helst, lägga till eller ta bort partners och betalningslösningar
              utan någon föregående notifikation till dig.
            </p>
            <h4>2.3 Leverans</h4>
            <p>
              När du har skapat ditt inlogg är du kund och ansvarar själv för
              att lägga upp dina verk så att dom blir publicerade på
              artportable.com
            </p>
            <h4>2.4</h4>
            <p>Som kund ansvarar du för att följa tjänstens policy.</p>
            <h4>3. Abonnemangsformer</h4>
            <p>
              3.1. Artportable förbehåller sig rätten att ensamt besluta om att
              addera nya abonnemangsformer, ta bort existerande
              abonnemangsformer eller att ändra egenskaper eller
              funktionaliteterna i sådana abonnemangsformer från tid till annan.
              Om en sådan ändring väsentligt påverkar en abonnents befintliga
              abonnemang negativt, kommer abonnenten att meddelas och
              kompenseras.
            </p>
            <h4>4. Priser och betalningar</h4>
            <p>
              4.1. Artportable samarbetar med tredje parter som tillhandahåller
              betalningstjänster genom vilka alla dina betalningar kommer
              genomföras innan de regleras hos Artportable.
            </p>
            <p>
              4.2. Produkten betalas i samband med köp. I vissa fall kan
              tidpunkten för debitering ändras, till exempel om det inte är
              möjligt att bekräfta giltigheten av information beträf ande
              exempelvis din valda betalningsmetod och kreditkortsuppgifter
            </p>
            <p>
              4.3. Priser på Artportables webbsida inkluderar moms. Betalning är
              möjligt via de betalningssätt som anges på Artportablers hemsida.
            </p>
            <p>
              4.4. Priser kan variera beroende på vilken typ av betalningsmetod
              som används. För det fall priser varierar kommer Artportable att
              informera om detta i anslutning till den allmänna
              betalningsinformationen på hemsidan.
            </p>
            <p>
              4.5. Artportable förbehåller sig rätten att stänga ned din
              tillgång till produkten vid utebliven eller sen betalning samt vid
              förhållanden där kunden ej följer Artportabel:s policy enligt vad
              som sägs Vid försenad betalning är Artportable berättigad att
              debitera dig skälig dröjsmålsränta, påminnelseavgift och
              tillämpliga inkassoavgifter
            </p>
            <h4>5. Ångerrätt under ångerrätts perioden</h4>
            <p>
              5.1. En abonnent av produkten har fjorton (14) dagars ångerrätt i
              enlighet med lagen (2005:59) om distansavtal och avtal utanför af
              ärslokaler, oaktat val av abonnemangsform. Ångerrätten gäller från
              den dagen du tecknade ditt abonnemang.
            </p>
            <p>
              5.2. Om du blivit kund enligt 2.3 och tiden överstiger 14 dagar
              accepterar du därigenom att ångerrätten enligt 5.1 förverkas.
            </p>
            <p>
              5.3 Om du vill avsluta abonnemanget under ångerrätt perioden
              vänligen meddela oss genom att skicka ett email till
              agreement@artportable.com
            </p>
            <h4>6. Tredjepartsinnehåll och länkar</h4>
            <p>
              6.1. Artportable är inte ansvarig för kvaliteten eller leveransen
              av några produkter erbjudna, tillgängliggjorda, mottagna eller
              marknadsförda på sådana tredje parters webbsidor, sociala medier
              eller kanaler. Artportable är därför inte ansvarig för innehåll
              som tillhandahålls på tredje parts webbsida, sociala medier eller
              kanaler i övrigt och Artportable är under inga omständigheter
              ansvariga för direkt, indirekt eller annan skada som uppstått
              genom oaktsamhet, passivitet, avtalsbrott, förtal,
              upphovsrättsintrång eller intrång i andra immateriella
              rättigheter, orsakat av framställning, distribuering eller
              nyttjande av information eller innehåll från tredje parts
              webbsidor, sociala medier eller kanaler i övrigt.
            </p>
            <p>
              6.2. Produkten kan komma att integrera, integreras med eller
              tillhandahållas i samband med tredje parts tjänster eller
              innehåll. Artportable kontrollerar inte dessa tredjepartstjänster
              eller deras innehåll. Du rekommenderas att noggrant läsa igenom
              eventuella avtal, villkor och integritetspolicys som avser sådana
              tredje parters tjänster och/eller deras innehåll.
            </p>
            <h4>7. Löptid och uppsägning</h4>
            <p>
              7.1. Premium tjänsten är löpande 12 månader på artportable.com
            </p>
            <p>
              7.2. För att säga upp abonnemanget inför en ny årsperiod måste du
              säga upp abonnemanget senast 1 månad innan en ny årsperiod
              påbörjas annars löper avtalet vidare i 12 månader.
            </p>
            <p>
              7.3. För att säga upp abonnemanget mailar du till
              agreement@artportable.com och du får då en bekräftelse på din
              uppsägning. Har du gjort en uppsägning kommer ditt medlemskap
              avslutas efter innevarande period.
            </p>
            <p>
              7.4 Artportable har ej skyldighet att betala tillbaka betald
              årsavgift av ett medlemskap som ingåtts och ej omfattas av
              ångerrätt enligt 5.1.
            </p>
            <p>
              7.5. Utöver vad som anges i punkten 4.5 eller någon annanstans i
              villkoren, har Artportable rätt att avsluta eller begränsa din
              användning av produkten med omedelbar verkan om Artportable har
              anledning att misstänka att du, eller annan person som du ger
              åtkomst till via ditt konto, bryter mot villkoren eller andra
              tillämpliga lagar, regler eller föreskrifter. Detta gäller även om
              du på andra sätt använder produkten på ett bedrägligt sätt eller i
              övrigt på ett sätt som kan medföra skada för Artportable eller
              annan tredje part.
            </p>
            <h4>8. Artportables rättigheter och åtaganden</h4>
            <p>
              8.1. Som del av tillhandahållandet av Tjänsten kan Artportable
              eller samarbetspartners till Artportable komma att kontakta dig
              via fysisk post, telefon, SMS, MMS, e-post eller direkt genom
              Tjänsten i syfte att kommunicera kring funktioner inklusive
              påminnelse om att ditt betalkort löper ut eller innehållet i
              Tjänsten. Där detta gäller kan Artportable också komma att
              kontakta dig via fysisk post, telefon, SMS, MMS, e-post eller
              direkt genom Tjänsten avseende erbjudanden eller liknande
              aktiviteter, produkter och event som är kopplade till Tjänsten.
            </p>
            <p>
              8.2. Artportable ansvarar inte för eventuella störningar i
              mobilnätet eller hos din internetleverantör.
            </p>
            <p>
              8.3. Produkten finns tillgänglig dygnet runt, sju dagar i veckan.
              Artportable ger dock inga garantier för att produkten alltid är
              fri från fel eller avbrott. För det fall det uppstår brister eller
              avbrott i produkten ska Artportable ges möjlighet att rätta till
              dessa utan att avtalsbrott ska anses föreligga. Artportable har
              också rätt att, i rimlig omfattning, tillfälligt stänga ned
              produkten i syfte att genomföra exempelvis uppdateringar,
              uppgraderingar och service.
            </p>
            <p>
              8.4. Artportable äger rätt att helt eller delvis överlåta sina
              rättigheter och skyldigheter enligt Villkoren till tredje part.
              Vidare har Artportable rätt att anlita underleverantörer för
              fullgörandet av sina skyldigheter enligt villkoren. Förändringar
              som kan påverka hanteringen av dina personuppgifter ska vidtas i
              enlighet med Artportables Integritetspolicy.
            </p>
            <p>
              8.5. Artportable kan ensamt besluta om att göra ändringar i
              villkoren. Om det görs materiella ändringar i villkoren med en
              negativ påverkan för dig kommer detta att kommuniceras antingen
              genom en notis i produkten eller genom ett e-postmeddelande, SMS
              eller push notifikation. I vissa fall kommer vi fråga efter ditt
              uttryckliga medgivande och i vissa fall kommer vi att meddela dig
              i förväg och då kommer din fortsatta användning av produkten
              räknas som ditt medgivande. Det är därför viktigt att du läser
              alla meddelanden från oss noggrant. Om du vid något tillfälle
              önskar upphöra med användandet av produkten på grund av sådana
              uppdateringar eller ändringar i Villkoren, kan du avsluta Tjänsten
              genom att följa instruktionerna under avsnitt 7 i dessa
              Användarvillkor
            </p>

            <h4>9. Abonnentens åtaganden och rättigheter</h4>
            <p>
              9.1 Abonnenten äger inte rätt att överlåta sina rättigheter och
              skyldigheter enligt villkoren utan Artportables skriftliga
              samtycke.
            </p>
            <p>
              9.2. Abonnenten förbinder sig att inte använda produkten på något
              sätt som riskerar eller kan riskera att produkten avbryts, skadas
              eller försämras på något sätt. Du förbinder dig att inte använda
              webbsidan för någon bedräglig aktivitet eller i anslutning till
              ett brottsligt agerande eller andra olagliga aktiviteter, eller
              att skicka, använda eller återanvända sådant material som inte
              tillhör dig; eller som är olagligt, stötande (inklusive men inte
              begränsat till material med sexuellt innehåll eller som främjar
              rasism, hat eller våld), bedrägligt, missvisande, utnyttjande,
              oanständigt, förolämpande, diskriminerande, nedsättande, obscent,
              pornografiskt eller gör intrång i upphovsrätt, varumärke,
              konfidentiell information, privatliv eller annan information eller
              rättighet vilken du inte äger eller som i övrigt är skadegörande
              för tredje part.
            </p>
            <p>
              9.3. För det fall produkten, eller delar därav, är felaktiga eller
              defekta uppmanas du att kontakta Artportable på
              support@artportable.com.
            </p>

            <h4>10. Avtalspart</h4>
            <p>
              10.1. Produkten erbjuds och tillhandahålls under dessa villkor av
              Artportable AB, ett aktiebolag registrerat i Sverige med
              organisationsnummer 559113-1171 med bolagsadress Åsögatan 176, 116
              32 Stockholm. För att kontakta oss eller vår kundtjänst ber vi dig
              skicka ett e-postmeddelande till support@artportable.com
            </p>
            <h4>11. Gratis provperiod</h4>
            <p>
              11.1 Ditt abonnemang kan erbjudas i samband med en gratis
              provperiod. Provperioden pågår under fjorton (14) dagar eller så
              länge som specificerats vid tidpunkten för din registrering och är
              avsedd att ge dig som använder tjänsten en möjlighet att testa
              Artportable.
            </p>
            <p>Tjänsten.</p>
            <p>
              När du registrerar dig för en Provperiod godkänner du samtidigt
              att du automatiskt övergår till ett månadsabonnemang när tiden för
              Provperioden löper ut, såvida du inte före Provperiodens sista dag
              avslutar abonnemanget. Om du avslutar abonnemanget före
              Provperiodens sista dag, kommer du ej debiteras och ditt
              abonnemang avslutas.
            </p>
            <p>
              11.2 Om du erbjuds en gratis Provperiod är det Artportables avsikt
              att erbjuda dig denna Provperiod endast en gång. Därför kan
              användare som redan använt sig av ett erbjudande om Provperiod
              komma stoppas från att nyttja fler Provperioder. Artportable har
              rätt att avgöra själv vem som får nyttja ett erbjudande om
              Provperiod och Artportable kan begränsa vem som får sådan rätt i
              syfte att förhindra missbruk och/eller överträdelse av Villkoren.
              Artportable förbehåller sig rätten att återta eller avsluta en
              Provperiod om Artportable enligt sin egen bedömning anser att en
              användare saknar behörighet att nyttja Provperioden. Användaren
              har inte rätt att kombinera erbjudandet om Provperiod med andra
              erbjudanden.
            </p>
            <h4>12. Övrigt</h4>
            <p>
              12.1. Villkoren ska vara föremål för och tolkas enligt svensk lag,
              exkluderat lagsvalsprinciper.
            </p>
            <p>
              12.2. Vid tvist mellan Artportable och abonnenten ska parterna i
              första hand försöka lösa tvisten genom överenskommelse. Om
              parterna inte kan enas ska tvisten avgöras av Allmänna
              Reklamationsnämnden (ARN), Box 174, 101 23 Stockholm,{" "}
              <a href="www.arn.se">
                <span style={{ color: "blue" }}>www.arn.se </span>
              </a>
              .I annat fall avgörs tvisten av allmän domstol i Sverige.
            </p>
            <p>
              12.3. För mer information om Tjänsten eller om du behöver hjälp
              med någon funktion eller ditt konto, vänligen kontakta
              support@artportable.com
            </p>
          </div>
        </Paper>
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
