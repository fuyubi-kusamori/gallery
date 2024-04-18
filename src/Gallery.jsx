import React, { useState } from 'react';

const Gallery = () => {
  // Function to generate imageData dynamically
  const generateImageData = (numImages) => {
    const images = [];
    for (let i = 1; i <= numImages; i++) {
      images.push({ id: i, url: `https://gallery-rouge-rho.vercel.app/img/${i}_s.jpg` });
    }
    return images;
  };

  // Generate imageData for a desired number of images
  const imageData = generateImageData(28); // Adjust the number as needed

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  // Current images slice, then reverse for descending order
  const currentImages = imageData.slice(indexOfFirstImage, indexOfLastImage).reverse();

  const [modalImage, setModalImage] = useState(null);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (image) => {
    const largeImageUrl = image.replace('_s', '_l');
    setModalImage(largeImageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="gallery">
      {currentImages.map((image) => (
        <img key={image.id} src={image.url} alt={`Image ${image.id}`} onClick={() => openModal(image.url)} />
      ))}
      <div className="pagination">
        {[...Array(Math.ceil(imageData.length / imagesPerPage)).keys()].map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageClick(pageNumber + 1)}>
            {pageNumber + 1}
          </button>
        ))}
      </div>
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <img src={modalImage} alt="Modal Content" className="modal-content" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
