import { useEffect, useRef, useState } from "react";

import Controls from "./components/Controls";
import Sidebar from "./components/Sidebar";
import MenuToggle from "./components/Sidebar/MenuToggle";
import Webcam from "./components/Webcam";
import serverService from "./services/serverService";
import socketService from "./services/socketService";

export default function App() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [serverDetails, setServerDetails] = useState<string>();
  const [isSidebarHide, setIsSidebarHide] = useState<boolean>(false);

  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(stream, 1000 / 30);
    return () => clearInterval(interval);
  });

  const stream = () => {
    if (isStarted) {
      socketService.stream(webcamRef.current.captureImage());
    }
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
    <div className="h-100">
      <Sidebar addressUrl={serverDetails} isHide={isSidebarHide} />

      <MenuToggle onToggle={(isToggled) => setIsSidebarHide(isToggled)} />

      <div
        className={`content p-2 d-flex flex-column justify-content-center align-items-center ${
          isSidebarHide ? "expand" : ""
        }`}
      >
        <Webcam ref={webcamRef} />

        <Controls
          isStarted={isStarted}
          isStarting={isStarting}
          handleServer={handleServer}
        />
      </div>
    </div>
  );
}
