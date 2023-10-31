import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'IMAGE';

const Image = ({ image, index, moveImage, isSelected, selectImage, featureImage, setFeatureImage }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={`${index === 0 ? 'item1 image' : 'image'} ${isSelected ? 'selected' : ''}`}>
      <img src={image} alt={`Image ${index}`} />
      <div className="image-actions">
        <input type="checkbox" checked={isSelected} onChange={() => selectImage(index)} />
      </div>
    </div>
  );
};

const ImageGallery = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(0);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...galleryImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setGalleryImages(updatedImages);
  };

  const selectImage = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((selected) => selected !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = galleryImages.filter((_, index) => !selectedImages.includes(index));
    setGalleryImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="image-gallery">
        <div className="selected-count">
          Selected Images: {selectedImages.length}
        </div>
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
      <div className="delete-button">
      <button onClick={deleteSelectedImages}>Delete Selected Images</button>
      </div>
    </DndProvider>
  );
};

export default ImageGallery;
