import { useState, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import "./Webcam.scss";

export default function Webcam() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function getWebcam() {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      } catch (error) {
        setError("Kameraya Ulaşılamıyor");
      } finally {
        setIsLoading(false);
      }
      if (stream) {
        loadStream(stream);
      }
    }
    getWebcam();
  }, []);

  const loadStream = (stream: MediaStream) => {
    videoRef.current.srcObject = stream;
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <h3 className="text-danger">{error}</h3>;
  }

  return (
    <video autoPlay ref={videoRef} className="rounded shadow webcam"></video>
  );
}
