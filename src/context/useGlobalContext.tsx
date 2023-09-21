import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getMetadata,
  updateMetadata,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase/firebase";

type AppProviderProps = {
  children: ReactNode;
};

type ContextValue = {
  files: File[];
  imageList: imageListType[];
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  setImageList: React.Dispatch<React.SetStateAction<imageListType[]>>;
  searchValue: string;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  handleUpload: () => void;
  error: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
  showUPloadBox:boolean;
  setShowUploadBox: React.Dispatch<SetStateAction<boolean>>;
};

type imageListType = {
  url: string;
  tag: [];
};

const AppContext = createContext<ContextValue>({
  files: [],
  imageList: [],
  setFiles: () => {},
  setImageList: () => {},
  searchValue: "",
  loading: true,
  setLoading: () => {},
  setSearchValue: () => {},
  handleDrop: () => {},
  handleUpload: () => {},
  error: false,
  setError: () => {},
  showUPloadBox: false,
  setShowUploadBox: () => {}
});

const AppProvider = ({ children }: AppProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<File[] | null>(null);
  const [imageList, setImageList] = useState<imageListType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState(false);
  const ImagesRef = ref(storage, `images/`);
  const [showUPloadBox, setShowUploadBox] = useState<boolean>(false);

  const getGallery = () => {
    setLoading(true); // Assuming you have loading and error state variables.
    setError(false);
    const imageDataArray: imageListType[] = [];

    listAll(ImagesRef)
      .then((responds) => {
        const promises = responds.items.map((item) => {
          const eachRef = ref(storage, item._location.path_);
          return getDownloadURL(item).then((url) => {
            return getMetadata(eachRef).then((metaData) => {
              console.log(metaData);
              const tags = metaData?.customMetadata?.tags || [];
              const imageData = {
                url,
                tags
              };
              imageDataArray.push(imageData);
            });
          });
        });
        return Promise.all(promises);
      })
      .then(() => {
        setImageList(imageDataArray);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(loading);

  console.log(imageList);

  useEffect(() => {
    getGallery();
  }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const filesArray = Array.from(event.dataTransfer.files);
    console.log(event);
    setFiles(filesArray);
  };

  const handleUpload = () => {
    console.log("clicked");
    if (files === null) return;

    files.forEach((file) => {
      const ImageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(ImageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const newMetadata = {
            customMetadata: {
              'tags': ['nature'],
            }
          };
          updateMetadata(ImageRef, newMetadata).then(() => {
            console.log("Metadata updated successfully.");
          });
        }).then(() => setShowUploadBox(false));
      });
    });
  };

  const contextValue: ContextValue = {
    files: files || [],
    imageList,
    setFiles,
    setImageList,
    searchValue,
    loading,
    setLoading,
    error,
    setError,
    setSearchValue,
    handleDrop,
    handleUpload,
    showUPloadBox,
    setShowUploadBox
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
