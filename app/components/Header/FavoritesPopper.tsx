import { useEffect } from "react";

export default function FavoritesPopper({ id }) {
  useEffect(() => {
    console.log({ id });
  }, [id]);

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Favorite Artworks</h3>
        <div>
          {id.map((id) => (
            <p key={id}>
              <p>{id}</p>
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
