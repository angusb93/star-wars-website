import Head from "next/head";
import StarWars from "../public/Star_Wars.svg";
import Image from "next/image";
import SearchableFilmList from "../components/SearchableFilmList";
import styles from "../styles/index.module.scss";
export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Star Wars App</title>
        <meta name="description" content="SWAPI website" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>
          <Image src={StarWars} alt="" />
        </h1>

        <SearchableFilmList filmData={props.data} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // gets data to be passed in as props to the page
  const res = await fetch("https://swapi.dev/api/films/");
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 5000,
  };
}
