import { useRef } from "react";
import { DragBox } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { BsFillFileEarmarkDiffFill } from "react-icons/bs";
import Loading from "./Loading";

const DragandDrop = () => {
  const { files, setFiles, handleDrop, handleUpload, showUPloadBox, loading } =
    useGlobalContext();
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(files);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  if (files.length > 0)
    return (
      <div className={`wedge ${showUPloadBox ? "" : "hidden"}`}>
        <div className="dropcontainer">
          <ul>
            {Array.from(files).map((file, idx) => (
              <li key={idx}>
                <BsFillFileEarmarkDiffFill />
                {file.name}
                {loading ? <Loading /> : ""}
                {loading ? "uploadiingFile" : ""}
              </li>
            ))}
          </ul>
          <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <DragBox
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        setFiles={setFiles}
        inputRef={inputRef}
      />
    </>
  );
};

export default DragandDrop;
