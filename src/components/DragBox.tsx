import { useGlobalContext } from "../context/useGlobalContext";

interface DragBoxPropsType {
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

// eslint-disable-next-line react/prop-types
const DragBox: React.FC<DragBoxPropsType> = ({ setFiles, inputRef }) => {
  const { showUploadBox, setShowUploadBox } = useGlobalContext();
  return (
    <div className={`wedge ${showUploadBox ? "block" : "hidden"}`}>
      <div className="dropcontainer">
      <div className="exit" onClick={() => setShowUploadBox(false)}>X</div>
        <h2>Drag and Drop Files to Upload</h2>
        <h2>Or</h2>
        <input
          type="file"
          multiple
          onChange={(event) => {
            if (event.target.files) {
              setFiles(Array.from(event.target.files));
            }
          }}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        {/* eslint-disable-next-line react/prop-types */}
        <button onClick={() => inputRef.current?.click()} className="selectBtn">
          Select Files
        </button>
      </div>
    </div>
  );
};

export default DragBox;
