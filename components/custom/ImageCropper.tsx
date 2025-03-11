import React, { FC, useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "react-image-crop/dist/ReactCrop.css";
import { RotateCcwIcon, RotateCwIcon } from "lucide-react";

const ROTATION_ANGLE = 90;

// Types
interface ImageCropperProps {
  onClose: () => void;
  onSuccess: (url: string) => void;
  selectedImg: string;
}

interface RotateButtonProps {
  direction: "left" | "right";
  onClick: (direction: "left" | "right") => void;
}

// Utility Components
const RotateButton: FC<RotateButtonProps> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(direction)}
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
    aria-label={`Rotate ${direction}`}
  >
    {direction === "left" ? (
      <RotateCcwIcon className="w-4 h-4" />
    ) : (
      <RotateCwIcon className="w-4 h-4" />
    )}
  </button>
);

export const ImageCropper: FC<ImageCropperProps> = ({
  onClose,
  onSuccess,
  selectedImg,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  //   const [rotation, setRotation] = useState(0);
  //   const [crop, setCrop] = useState<Crop>(INITIAL_CROP);
  const [isProcessing] = useState(false);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL(); // Convert to Base64
      onSuccess(croppedImage); // Pass the cropped image to the parent component
    }
  };

  const handleImageRotate = (direction: "left" | "right") => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotate(direction === "left" ? -ROTATION_ANGLE : ROTATION_ANGLE); // Rotate 90 degrees clockwise
    }
  };

  if (!selectedImg) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
        <h3 className="text-lg font-medium mb-4">Crop Image</h3>

        <Cropper
          src={selectedImg}
          style={{ height: 400, width: "100%" }}
          aspectRatio={16 / 9}
          guides={true}
          cropBoxResizable={true}
          autoCropArea={1}
          viewMode={1}
          rotatable={true}
          initialAspectRatio={16 / 9}
          ref={cropperRef}
          //   rotateTo={rotation} // Apply rotation
        />
        <div className="mt-4 flex justify-between gap-2">
          <div className="flex gap-2">
            <RotateButton direction="left" onClick={handleImageRotate} />
            <RotateButton direction="right" onClick={handleImageRotate} />
          </div>

          <div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded mr-2 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCrop}
              disabled={isProcessing}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {isProcessing ? "Processing..." : "Crop & Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
