import { DragandDrop, NavBar } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import Loading from "./Loading";

const Home: React.FC = () => {
  const { loading } = useGlobalContext();

  return (
    <main className="center">
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="middle">
          <DragandDrop />
        </div>
      )}
    </main>
  );
};

export default Home;
