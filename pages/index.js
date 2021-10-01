import Head from "next/head";

import SearchableFilmList from "../components/SearchableFilmList";
import styles from "../styles/index.module.scss";
export default function Home(props) {
  // console.log(props.data);
  return (
    <div>
      <Head>
        <title>Star Wars App</title>
        <meta name="description" content="SWAPI website" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>Star Wars App</h1>
        <SearchableFilmList filmData={props.data} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://swapi.dev/api/films/");
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 5000,
  };
}
