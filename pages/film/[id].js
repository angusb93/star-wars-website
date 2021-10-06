import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/pageStyles.module.scss";

const Film = (props) => {
  const router = useRouter();
  const { id } = router.query;

  // iterate over props.data.results and return the item with the matching id
  const film = props.data.results.find((film) => {
    return film.episode_id === parseInt(id);
  });

  if (!film) return <p>Film not found</p>;
  if (typeof window !== "undefined") {
    console.log(props.data.results);
  }

  const filmItems = Object.keys(film).map((key) => {
    return (
      <div className={styles.filmItem} key={key}>
        <h3 className={styles.itemTitle}>{key.replace("_", " ")}</h3>
        {Array.isArray(film[key]) ? (
          <ul className={styles.itemContent}>
            {film[key].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className={styles.itemContent}>{film[key]}</div>
        )}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <h1>{film.title}</h1>
      {filmItems}
      <Link href="/">
        <a className={styles.goBack}>Go home</a>
      </Link>
    </div>
  );
};

export default Film;

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://swapi.dev/api/films/");
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.results.map((film) => ({
    params: { id: film.episode_id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const res = await fetch("https://swapi.dev/api/films/");
  const data = await res.json();

  async function getItemNames(characterURL) {
    const characterNameRes = await fetch(characterURL);
    const characterName = await characterNameRes.json();
    return characterName.name;
  }

  for (let [index, film] of data.results.entries()) {
    for (let filmItem of Object.keys(film)) {
      // if (Array.isArray(film[filmItem])) {
      if (filmItem === "species") {
        for (let itemURL of film[filmItem]) {
          const itemName = await getItemNames(itemURL);
          data.results[index][filmItem][
            data.results[index][filmItem].indexOf(itemURL)
          ] = itemName;
        }
      }
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 10000,
  };
}
