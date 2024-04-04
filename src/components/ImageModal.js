import React, { useState } from 'react';

function ImageModal({ src, alt }) {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open modal
    const openModal = () => setIsModalOpen(true);

    // Function to close modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Image that opens modal on click */}
            <figure className="flex-none py-4 pl-4 md:block" onClick={openModal}>
                <img className="hidden md:block h-28 w-40 mr-4 object-cover cursor-pointer" src={src} alt={alt} />
            </figure>

            {/* Modal dialog */}
            {isModalOpen && (
                <dialog className="modal" open>
                    <div className="modal-box w-11/12 max-w-5xl bg-base-300">
                        {/* Display the clicked image */}
                        <img src={src} alt={alt} className="max-w-full h-auto" />

                        {/* Close button */}
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default ImageModal;
