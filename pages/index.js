import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MovieList from "../components/MovieList";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars App</title>
        <meta name="description" content="SWAPI website" />
      </Head>

      <main>
        <h1 className={styles.title}>Star Wars App</h1>
        <MovieList />
      </main>
    </div>
  );
}
