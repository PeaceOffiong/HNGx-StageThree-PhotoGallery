import { DragandDrop, NavBar } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import Loading from "./Loading";
import {ReactSortable} from "react-sortablejs";

const Home: React.FC = () => {
  const { loading, imageList, setImageList } = useGlobalContext();
  return (
    <main className="center">
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="middle">
          <DragandDrop />
          <ul>
            <ReactSortable  swap list={imageList} setList={setImageList}>
            {imageList.map((each, index) => {
              return (
                <li
                  key={index}
                >
                  <img src={each.url} alt={"me"} />
                  <p>{each.tags}</p>
                </li>
              );
            })}
            </ReactSortable>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Home;
