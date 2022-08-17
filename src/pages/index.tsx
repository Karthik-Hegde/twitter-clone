import type { NextPage } from "next";
import { Feed, Sidebar, Widgets } from "../components";

const Home: NextPage = ({ newsResults, randomUserResults }) => {
  return (
    <div className="flex">
      <main className="flex self-center min-h-screen mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          newsResults={newsResults}
          randomUserResults={randomUserResults}
        />
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  const randomUserResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults: newsResults.articles,
      randomUserResults: randomUserResults.results,
    },
  };
}
