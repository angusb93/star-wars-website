import Head from "next/head";
import Image from "next/image";
import FilmList from "../components/FilmList";
import styles from "../styles/index.module.scss";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Star Wars App</title>
        <meta name="description" content="SWAPI website" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>Star Wars App</h1>
        <FilmList />
      </main>
    </div>
  );
}
