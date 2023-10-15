import React, { useEffect, useRef } from "react";

const Modal = ({ closeModal, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeModal]);
  return (
    <div>
      <div class="fixed inset-0 flex flex-col justify-center items-start z-50 overflow-auto bg-opacity-80 bg-black">
        <div
          ref={ref}
          className="p-6 rounded-lg mx-auto border border-gray-300 relative bg-white shadow-lg"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
