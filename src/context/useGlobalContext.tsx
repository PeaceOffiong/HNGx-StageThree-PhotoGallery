
import React, {
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
import { filterImagesByTag } from "../libs/getFilteredImages";


type AppProviderProps = {
  children: ReactNode;
};

export type imageListType = {
  url: string;
  tags: string;
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
  handleUpload: () => void;
  error: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
  showUploadBox: boolean;
  setShowUploadBox: React.Dispatch<SetStateAction<boolean>>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
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
  handleUpload: () => {},
  error: false,
  setError: () => {},
  showUploadBox: false,
  setShowUploadBox: () => {},
  handleInputChange: () => {},
});

const AppProvider = ({ children }: AppProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<File[] | null>(null);
  const [imageList, setImageList] = useState<imageListType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const ImagesRef = ref(storage, `images/`);
  const [showUploadBox, setShowUploadBox] = useState<boolean>(false);

  const getGallery = () => {
    setLoading(true);
    setError(false);
    const imageDataArray: imageListType[] = [];

    listAll(ImagesRef)
      .then((responds) => {
        const promises = responds.items.map((item) => {
          const eachRef = ref(storage, item._location.path_);
          return getDownloadURL(item).then((url) => {
            return getMetadata(eachRef).then((metaData) => {
              const tags = metaData?.customMetadata?.tags || [];
              const imageData = {
                url,
                tags,
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



  useEffect(() => {
    getGallery();
  }, []);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newInputValue = e.target.value;
    setSearchValue(newInputValue);

    const filteredImages = filterImagesByTag({
      inputValue: newInputValue,
      imageArray: imageList,
    });
    console.log(filteredImages);

    setImageList(filteredImages);
  };

  const handleUpload = () => {
    setLoading(true);
    if (files === null) return;

    files.forEach((file) => {
      const ImageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(ImageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            const newMetadata = {
              customMetadata: {
                tags: ["nature"],
              },
            };

            updateMetadata(ImageRef, newMetadata)
              .then(() => {
                console.log("Metadata updated successfully.");
              })
              .then(() => {
                getMetadata(ImageRef).then((metaData) => {
                  const tags = metaData?.customMetadata?.tags || [];
                  setImageList((prev) => [...prev, { url, tags }]);
                });
              });
          })
          .finally(() => {
            setShowUploadBox(false);
            setLoading(false);
          });
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
    handleUpload,
    showUploadBox,
    setShowUploadBox,
    handleInputChange,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
