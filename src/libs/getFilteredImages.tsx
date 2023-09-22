import { imageListType } from "../context/useGlobalContext";

interface FilterImagesByTagProps {
  inputValue: string;
  imageArray: imageListType[];
}

export const filterImagesByTag = ({
  inputValue,
  imageArray,
}: FilterImagesByTagProps): imageListType[] => {
  
  if (inputValue.trim() === "") {
    return imageArray;
  }
  const filteredImages = imageArray.filter((image) =>
    image.tags.toLowerCase().includes(inputValue.toLowerCase())
  );

  return filteredImages;
};
  
