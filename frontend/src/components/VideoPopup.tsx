import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";

import "yet-another-react-lightbox/styles.css";

interface VideoPopupProps {
  videoId: string;
  children: React.ReactNode;
  className?: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({
  videoId,
  children,
  className = "",
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className={className}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setOpen(false)}
        slides={[
          {
            type: "video",
            sources: [
              {
                src: `https://www.youtube.com/embed/${videoId}`,
                type: "video/youtube",
              },
            ],
            // Can add poster images, etc. here
          },
        ]}
        // Enable the video plugin
        plugins={[Video]}
      />
    </>
  );
};

export default VideoPopup;
