import { useGlobalContext } from "../context/useGlobalContext";

const NavBar: React.FC = () => {
  const { searchValue, handleInputChange, setShowUploadBox } = useGlobalContext();

  return (
    <nav>
      <div className="top">
        <div className="typography">
          <h1>
            <b>Peace&apos;s Gallery</b>
          </h1>
        </div>
        <div className="laterFix">
        <input
        type="text"
        name=""
        value={searchValue}
        onChange={handleInputChange}
        className="searchBar"
      />
        </div>
      </div>
      <div className="left">
        <button onClick={() => setShowUploadBox(true)} className="btnNav">
          Upload Image
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
