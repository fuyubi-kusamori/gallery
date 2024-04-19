import React, { useState } from 'react';
import './styles.css'; // Apply styles by importing

const Gallery = () => {
  // Function to generate imageData dynamically
  const generateImageData = (numImages) => {
    const images = [];
    for (let i = 1; i <= numImages; i++) {
      images.push({ id: i, url: `https://gallery-rouge-rho.vercel.app/img/${i}_s.jpg` });
    }
    return images.reverse();
  };

  // Generate imageData for a desired number of images
  const imageData = generateImageData(27); // Adjust the number as needed

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageData.slice(indexOfFirstImage, indexOfLastImage);

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

  const getRandomNumber = () => Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6

  return (
    <div className="gallery">
      {currentImages.map((image) => (
        <>
          <p><img className="clip" src={`./etc/${getRandomNumber()}.jpg`} /><br /></p> {/* Simulated PHP-style code */}
          <img key={image.id} src={image.url} alt={`Image ${image.id}`} onClick={() => openModal(image.url)} />
        </>
      ))}
      <div className="pagination">
        {[...Array(Math.ceil(imageData.length / imagesPerPage)).keys()].map((pageNumber) => (
          <a key={pageNumber} onClick={() => handlePageClick(pageNumber + 1)}>
            {pageNumber + 1}
          </a>
        ))}
      </div>
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Modal Content" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
