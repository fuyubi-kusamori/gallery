import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'styles.css';

const Gallery = () => {
  const generateImageData = (numImages) => {
    const images = [];
    for (let i = 1; i <= numImages; i++) {
      images.push({ id: i, url: `https://gallery-rouge-rho.vercel.app/img/${i}_s.jpg` });
    }
    return images.reverse();
  };

  const imageData = generateImageData(27);

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageData.slice(indexOfFirstImage, indexOfLastImage);

  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (image) => {
    const largeImageUrl = image.replace('_s', '_l');
    setModalImage(largeImageUrl);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="gallery">
      {currentImages.map((image) => (
        <img key={image.id} src={image.url} alt={`Image ${image.id}`} onClick={() => openModal(image.url)} />
      ))}
      <div className="pagination">
        {[...Array(Math.ceil(imageData.length / imagesPerPage)).keys()].map((pageNumber) => (
          <Button key={pageNumber} variant="primary" onClick={() => handlePageClick(pageNumber + 1)}>
            {pageNumber + 1}
          </Button>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Body>
          <img src={modalImage} alt="Modal Content" style={{width: '100%'}} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Gallery;
