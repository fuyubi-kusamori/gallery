.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Adjusts the alignment of items on the line */
}

p {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px; /* Adjusts the spacing between paragraphs/containers */
}

img {
  margin: 5px; /* Slight reduction in margin for cleaner layout */
  max-width: 100%; /* Ensures images are responsive and scale with their container */
  height: auto; /* Maintains aspect ratio */
}

.modal-content {
  background: white;
  padding: 10px;
  border-radius: 10px;
}
