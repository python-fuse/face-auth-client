import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw, Check } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (imageBlob: Blob, imageDataUrl: string) => void;
  isCapturing?: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  isCapturing = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);
        setError("");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Unable to access camera. Please ensure camera permissions are granted."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and data URL
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const dataUrl = canvas.toDataURL("image/png");
          setCapturedImage(dataUrl);
          onCapture(blob, dataUrl);
        }
      },
      "image/png",
      0.8
    );
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
        <Button onClick={startCamera} className="w-full mt-4" variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured face"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {isStreaming && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Face detection overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-48 h-48 border-2 border-blue-500 rounded-full"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute w-32 h-32 border-2 border-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                </div>

                {/* Corner guides */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white"></div>

                {/* Instructions */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Position your face in the circle
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-3">
        {capturedImage ? (
          <>
            <Button
              onClick={retakePhoto}
              variant="outline"
              className="flex-1"
              disabled={isCapturing}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake
            </Button>
            <Button
              onClick={() => {}}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isCapturing}
            >
              <Check className="h-4 w-4 mr-2" />
              Use Photo
            </Button>
          </>
        ) : (
          <Button
            onClick={capturePhoto}
            disabled={!isStreaming || isCapturing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Capture Face
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
