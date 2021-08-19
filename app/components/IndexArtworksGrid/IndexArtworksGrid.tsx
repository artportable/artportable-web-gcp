import ArtworkStartItem from '../ArtworkStartItem/ArtworkStartItem'
import { styles } from './indexArtworksGrid.css'
import useGetColumns from '../../hooks/gridUtils/useGetColumns'
import { shuffleArray } from '../../utils/util'

const IndexArtworksGrid = ({ artworks }) => {
  const s = styles();
  const { numberOfColumns, width } = useGetColumns('regular');
  
  const columns = getRandomizedColumns(artworks.data, numberOfColumns);

  return (
    <div className={s.artworks}>
      {columns && columns.map((column, i) =>
        <div key={i} className={s.column}>
          {column.map(artwork => <ArtworkStartItem artwork={artwork} width={width} key={artwork.Image.Name} />)}
        </div>
      )}
    </div>
  );
}

const getRandomizedColumns = (artworks, numberOfColumns) =>  {
  if(artworks === undefined || numberOfColumns < 1) {return;}
  const artworksCopy = [...artworks];
  const columns = Array.from({ length: numberOfColumns }, (_, i) => ({ totalRatio: 0, column: []}));


  while (artworksCopy.length > 0) {
    const index = randomNumber(artworksCopy.length) - 1;
    const randomArtwork = artworksCopy.splice(index, 1).shift();
    const randomArtworkRatio = randomArtwork.Image.Height / randomArtwork.Image.Width;

    columns[0].column.push(randomArtwork);
    columns[0].totalRatio += randomArtworkRatio;
    columns.sort((firstEl, secondEl) => firstEl.totalRatio - secondEl.totalRatio);
  }

  return shuffleArray(columns.map(col => col.column));
}

const randomNumber = (max: number = 1) => {
  return Math.floor(Math.random() * max);
}

export default IndexArtworksGrid;