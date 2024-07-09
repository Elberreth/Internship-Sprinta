import React, { useState } from "react";
import AgreementPopup from "./AgreementPopup";

const ParentComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Show Agreement</button>
      {showPopup && <AgreementPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default ParentComponent;
