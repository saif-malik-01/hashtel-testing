import React, { useEffect, useState } from "react";
import Image from "next/image";

// Constants for magnifier size and zoom level
const MAGNIFIER_SIZE = 200;
const ZOOM_LEVEL = 2.5;

// ImageEffect component
const ImageMagnify = (props) => {
  const [zoomable, setZoomable] = useState(true);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 100,
    y: 100,
    mouseX: 400,
    mouseY: 400,
  });

  // Event handlers
  const handleMouseEnter = (e) => {
    let element = e.currentTarget;
    let { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };

  const handleMouseLeave = (e) => {
    setZoomable(false);
    updatePosition(e);
  };

  const handleMouseMove = (e) => {
    updatePosition(e);
  };

  const updatePosition = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

  // Render method
  return (
    <div className="flex justify-center items-center">
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden"
      >
        <Image className="border z-10" {...props} />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${props.src})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
              imageSize.height * ZOOM_LEVEL
            }px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`z-50 border-4 pointer-events-none absolute border-gray-500`}
        />
      </div>
    </div>
  );
};

export default ImageMagnify;
