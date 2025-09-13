import * as React from "react";

export const PopupExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      {/* Button to open popup */}
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Open Popup
      </button>

     
    </div>
  );
};
