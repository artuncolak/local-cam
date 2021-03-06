import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";

import { WebcamContext } from "../../WebcamContextProvider";

const Webcam = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvas = document.createElement("canvas");

  const { id } = useContext(WebcamContext);

  useImperativeHandle(ref, () => ({
    captureImage,
    isLoading,
  }));

  useEffect(() => {
    async function getWebcam() {
      let stream: MediaStream;
      setIsLoading(true);
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 60 },
            deviceId: id,
          },
        });
      } catch (error) {
        setError("Kameraya Ulaşılamıyor");
      } finally {
        setIsLoading(false);
      }
      if (stream && id) {
        loadStream(stream);
      }
    }
    getWebcam();
  }, [id]);

  const captureImage = (): string => {
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0);

    return canvas.toDataURL("image/webp");
  };

  const loadStream = (stream: MediaStream) => {
    videoRef.current.srcObject = stream;
  };

  if (isLoading) {
    return (
      <div className="webcam">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="webcam">
        <h3 className="text-danger">{error}</h3>
      </div>
    );
  }

  return <video autoPlay ref={videoRef} className="rounded webcam" />;
});

export default Webcam;
