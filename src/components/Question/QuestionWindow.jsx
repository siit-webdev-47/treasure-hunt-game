import React, { useState } from 'react';

function QuestionWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen  
 && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>This is the content of the modal.</p>
            <button onClick={closeModal}>Close</button>  

          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionWindow;