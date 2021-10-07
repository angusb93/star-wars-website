import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/pageStyles.module.scss";
import ReactTooltip from "react-tooltip";
const Film = (props) => {
  const router = useRouter();
  const { id } = router.query;

  // iterate over props.data.results and return the item with the matching id
  const film = props.data.results.find((film) => {
    return film.episode_id === parseInt(id);
  });

  if (!film) return <p>Film not found</p>;

  const filmItems = Object.keys(film).map((key) => {
    return (
      <div className={styles.filmItem} key={key}>
        <ReactTooltip
          multiline={true}
          backgroundColor="white"
          textColor="black"
        />
        {/* renders the data passed in as props. If it is an array like characters is renders all of that as a list
        if it is from characters section it adds a tooltip as well */}
        <h3 className={styles.itemTitle}>{key.replace("_", " ")}</h3>
        {Array.isArray(film[key]) ? (
          <ul className={styles.itemContent}>
            {film[key].map((item, index) => (
              <li
                key={index}
                data-tip={
                  key === "characters"
                    ? `${item.name} <br/>
                    Height is: ${item.height}cm <br/> 
                    Weight is: ${item.mass}kg <br/> 
                    Hair Color is: ${item.hair_color} <br/> 
                    Eye color is: ${item.eye_color}`
                    : undefined
                }
              >
                {item.name}{" "}
              </li>
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
  // Call SWAPI to get the data and parse it into json
  const res = await fetch("https://swapi.dev/api/films/");
  const data = await res.json();

  //function to call the URL and return the data
  async function getItemNames(itemURL) {
    const itemNameRes = await fetch(itemURL);
    const itemName = await itemNameRes.json();
    return itemName;
  }

  // iterates through the data and calls the getItemNames function and updates the data
  // essentially "filling out" the data with the responses instead of the URLs
  for (let [index, film] of data.results.entries()) {
    for (let filmItem of Object.keys(film)) {
      if (Array.isArray(film[filmItem])) {
        // if (filmItem === "characters") {
        for (let itemURL of film[filmItem]) {
          const itemName = await getItemNames(itemURL);
          data.results[index][filmItem][
            data.results[index][filmItem].indexOf(itemURL)
          ] = { ...itemName };
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
