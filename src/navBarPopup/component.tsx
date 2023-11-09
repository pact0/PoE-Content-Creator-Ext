import React from "react";

export const Popup: React.FC = () => {
  return (
    <div>
      <h3>TFT Trade Extension</h3>
      <p>Version 2.0.41</p>
      <button onClick={() => window.open("https://discord.com/invite/tftrove")}>
        Join Our Discord!
      </button>
    </div>
  );
};
