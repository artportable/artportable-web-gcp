export default function Exhibitions() {
  return (
    <>
      <title>Lediga jobbannonser</title>
      <div>Utställningar</div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {},
    revalidate: 60,
  };
}
