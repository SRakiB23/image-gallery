import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; /*used for drag and drop*/

const ItemType = "IMAGE";

const Image = ({
  image,
  index,
  moveImage,
  isSelected,
  selectImage,
  featureImage,
  setFeatureImage,
}) => {
  const [, ref] = useDrag({ /*used for enabling draging of the image*/
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({ /*used for allowing drop or hover of image*/
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);/* reorder images when hovered over */
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`${index === 0 ? "item1 image" : "image"} ${ /*if index 0 then add the class item1 to style different*/
        isSelected ? "selected" : ""
      }`}
    >
      <div className="img-container">
        <img src={image} alt={`Image ${index}`}/> 
      </div>
     
      <div className="image-actions">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => selectImage(index)}
        />
      </div>
    </div>
  );
};

const ImageGallery = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState(images); /* to set initial gallery images */
  const [selectedImages, setSelectedImages] = useState([]); /* manage selected images */
  const [featureImage, setFeatureImage] = useState(0);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...galleryImages]; /* clone the array of gallery images */
    const [movedImage] = updatedImages.splice(fromIndex, 1);/* move image within the array */
    updatedImages.splice(toIndex, 0, movedImage);
    setGalleryImages(updatedImages);/* use to update the gallery images state */
  };

  const selectImage = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(
        selectedImages.filter((selected) => selected !== index)
      );
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => { /* function to delete selected images */
    const updatedImages = galleryImages.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setGalleryImages(updatedImages);/* update the galleryImages state */
    setSelectedImages([]);
  };

  return (
    <div>
      <div className="selected-count">
      {selectedImages.length ? ( /* display the selected image count and delete button if there are selected images */
        <div >
          <input type="checkbox" checked="checked"></input>
          {selectedImages.length} Files Selected
        </div>
      ) : null}
      {selectedImages.length ? (
        <div>
          <button  className="delete-button" onClick={deleteSelectedImages}>
            Delete files
          </button>
        </div>
      ) : null}
      </div>
      
      <DndProvider backend={HTML5Backend}>
        <div className="image-gallery">
          {galleryImages.map((image, index) => (
            <Image
              key={index}
              image={image}
              index={index}
              moveImage={moveImage}
              isSelected={selectedImages.includes(index)}
              selectImage={selectImage}
              featureImage={featureImage}
              setFeatureImage={setFeatureImage}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default ImageGallery;
