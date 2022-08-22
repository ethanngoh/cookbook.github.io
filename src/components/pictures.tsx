import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import styled from "@emotion/styled";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { COLORS_1 } from "../colors";

const PicturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  gap: 0.5rem;
  border: 2px solid ${COLORS_1.BACKGROUND3};
  padding: 0 0 2em 0;
  margin: 1em 0;
`;

export interface Image extends ReactImageGalleryItem {
  original: string;
  originalHeight: number;
  thumbnailHeight: number;
  thumbnail: string;
  metadata: any;
}

function customLeftNav(onClick: React.MouseEventHandler<HTMLElement>, disabled: boolean) {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <FiChevronLeft size={36} />
    </button>
  );
}

function customRightNav(onClick: React.MouseEventHandler<HTMLElement>, disabled: boolean) {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-right-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <FiChevronRight size={36} />
    </button>
  );
}

export const Pictures = ({ images }: { images: Image[] }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <>
      <h2>Pictures</h2>
      <PicturesContainer>
        <br />
        <ImageGallery
          items={images}
          onSlide={setImageIndex}
          showFullscreenButton={false}
          showPlayButton={false}
          renderLeftNav={customLeftNav}
          renderRightNav={customRightNav}
          thumbnailPosition={"top"}
        />
      </PicturesContainer>
    </>
  );
};
