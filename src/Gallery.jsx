import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
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
  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (image) => {
    setModalImage(image.replace('_s', '_l'));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="gallery">
      <Row>
        {currentImages.map((image) => (
          <Col xs={6} md={4} lg={3} key={image.id} className="mb-3">
            <img src={image.url} alt={`Image ${image.id}`} className="img-fluid" onClick={() => openModal(image.url)} />
          </Col>
        ))}
      </Row>
      <Row>
        <div className="pagination">
          {currentPage > 1 && (
            <Button variant="link" onClick={() => handlePageClick(currentPage - 1)}>&laquo;</Button>
          )}
          {[...Array(numOfPages).keys()].map(number => (
            <Button key={number + 1} variant="link"
               onClick={() => handlePageClick(number + 1)}
               className={currentPage === number + 1 ? 'active' : ''}
            >
              {number + 1}
            </Button>
          ))}
          {currentPage < numOfPages && (
            <Button variant="link" onClick={() => handlePageClick(currentPage + 1)}>&raquo;</Button>
          )}
        </div>
      </Row>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Body>
          <img src={modalImage} alt="Modal Content" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Gallery;
