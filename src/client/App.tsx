import { useEffect, useRef, useState } from "react";

import Controls from "./components/Controls";
import Sidebar from "./components/Sidebar";
import Webcam from "./components/Webcam";
import serverService from "./services/serverService";
import socketService from "./services/socketService";
import WebcamContextProvider from "./WebcamContextProvider";

export default function App() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [serverDetails, setServerDetails] = useState<string>();

  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(stream, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const stream = () => {
    socketService.startStream(webcamRef.current.captureImage());
  };

  const handleServer = async () => {
    setIsStarting(true);
    try {
      if (isStarted) {
        await serverService.stop();
        setServerDetails(null);
        setIsStarted(false);
      } else {
        const { address, port } = await serverService.start();
        setServerDetails(`http://${address}:${port}`);
        setIsStarted(true);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <WebcamContextProvider>
      <div className="h-100">
        <Sidebar />
        <div className="content p-2 d-flex flex-column justify-content-center align-items-center">
          <Webcam ref={webcamRef} />
        </div>
        <div className="controls-container d-flex justify-content-center align-items-center py-3">
          <Controls
            serverDetails={serverDetails}
            isStarted={isStarted}
            isStarting={isStarting}
            handleServer={handleServer}
          />
        </div>
      </div>
    </WebcamContextProvider>
  );
}
