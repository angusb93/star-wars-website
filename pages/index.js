import Head from "next/head";
import Image from "next/image";
import FilmList from "../components/FilmList";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Star Wars App</title>
        <meta name="description" content="SWAPI website" />
      </Head>

      <main>
        <h1>Star Wars App</h1>
        <FilmList />
      </main>
    </div>
  );
}
