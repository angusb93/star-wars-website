import { useRouter } from "next/router";
import Link from "next/link";

const Film = (props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <ul>
        {props.data.results.map((post) => (
          <li key={post.episode_id}>{post.title}</li>
        ))}
      </ul>
      <Link href="/">
        <a>Go home</a>
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
  // console.log(data);
  return {
    props: {
      data,
    },
    revalidate: 5000,
  };
}
