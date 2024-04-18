import React, { useState } from 'react';
import Image from 'next/image';

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

  return (
    <div className="gallery">
      {currentImages.map((image) => (
        <div key={image.id} onClick={() => openModal(image.url)}>
          <Image src={image.url} alt={`Image ${image.id}`} width={500} height={500} />
        </div>
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
          <Image src={modalImage} alt="Modal Content" className="modal-content" width={500} height={500} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
