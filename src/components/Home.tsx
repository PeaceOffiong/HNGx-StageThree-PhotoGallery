import { DragandDrop, NavBar } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import Loading from "./Loading";
import { useRef } from "react";

const Home: React.FC = () => {
  const { loading, imageList, setImageList } = useGlobalContext();

  const dragItem = useRef<any>();
  const draggedOver = useRef<any>();

  const handleSort = () => {
    let tempImageList = [...imageList];
    const draggedItemContent =tempImageList.splice(dragItem.current, 1)[0];

    tempImageList.splice(draggedOver.current, 0, draggedItemContent);

    dragItem.current = null;
    draggedOver.current = null;

    setImageList(tempImageList)
  };

  return (
    <main className="center">
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="middle">
          <DragandDrop />
          <ul>
            {imageList.map((each, index) => {
              return (
                <li
                  key={index}
                  draggable
                  onDragStart={(e) => dragItem.current = index}
                  onDragEnter={(e) => draggedOver.current = index}
                  onDragEnd={handleSort}
                  onDragOver= {(e) => e.preventDefault()}
                >
                  <img src={each.url} alt={"me"} />
                  <p>{each.tag}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Home;
