import { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

import { WebcamContext } from "../../WebcamContextProvider";
import { AccordionSelectDevices } from "./AccordionSelect";

export default function Sidebar() {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const webcamContext = useContext(WebcamContext);

  useEffect(() => {
    const getMediaDevices = async () => {
      const videoDevices = (
        await navigator.mediaDevices.enumerateDevices()
      ).filter((device) => device.kind === "videoinput");
      setMediaDevices(videoDevices);
      setIsLoading(false);
    };
    getMediaDevices();
  }, []);

  return (
    <div className="sidebar h-100 shadow">
      {isLoading ? null : (
        <Accordion>
          <AccordionSelectDevices
            header="Kaynak"
            eventKey="0"
            items={mediaDevices}
            onSelect={(item) => {
              webcamContext.setId(item.deviceId);
            }}
          />
        </Accordion>
      )}
    </div>
  );
}
