import React, { useState } from 'react';
import './styles.css'; // Apply styles by importing

const Gallery = () => {
  const generateImageData = (numImages) => {
    const images = [];
    for (let i = 1; i <= numImages; i++) {
      images.push({ id: i, url: `https://gallery-rouge-rho.vercel.app/img/${i}_s.jpg` });
    }
    return images.reverse();
  };

  const imageData = generateImageData(27); // Adjust the number as needed
  const imagesPerPage = 12;
  const numOfPages = Math.ceil(imageData.length / imagesPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const currentImages = imageData.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (image) => {
    const largeImageUrl = image.replace('_s', '_l');
    setModalImage(largeImageUrl);
    // Add a delay to apply the scale class after the modal is rendered
    setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.add('open');
    }, 10); // Short delay to ensure the class is added after rendering
  };

  const closeModal = () => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.remove('open'); // Remove the class when modal is closed
    }
    setModalImage(null);
  };

  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="gallery">
      {currentImages.map((image) => (
        <p key={image.id}>
          <img className="clip" src={`https://gallery-rouge-rho.vercel.app/clip/${Math.floor(Math.random() * 6) + 1}.jpg`} alt="Random Image" /><br />
          <img src={image.url} alt={`Image ${image.id}`} onClick={() => openModal(image.url)} />
        </p>
      ))}
      <div className="pagination">
        {currentPage > 1 && (
          <a onClick={() => handlePageClick(currentPage - 1)}>&laquo;</a>
        )}
        {[...Array(numOfPages).keys()].map(number => (
          <a key={number + 1} 
             onClick={() => handlePageClick(number + 1)}
             className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}{currentPage === number + 1 ? '*' : ''}
          </a>
        ))}
        {currentPage < numOfPages && (
          <a onClick={() => handlePageClick(currentPage + 1)}>&raquo;</a>
        )}
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
