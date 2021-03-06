import { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

import { WebcamContext } from "../../WebcamContextProvider";
import { AccordionSelectDevices } from "./AccordionSelect";
import QrCode from "./QrCode";

interface SidebarProps {
  addressUrl: string;
  isHide: boolean;
}

export default function Sidebar({ addressUrl, isHide }: SidebarProps) {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const webcamContext = useContext(WebcamContext);

  useEffect(() => {
    const getMediaDevices = async () => {
      const videoDevices = (
        await navigator.mediaDevices.enumerateDevices()
      ).filter((device) => device.kind === "videoinput");
      setMediaDevices(videoDevices);
      webcamContext.setId(videoDevices[0].deviceId);
      setIsLoading(false);
    };
    getMediaDevices();
  }, []);

  return (
    <div className={`sidebar h-100 shadow ${isHide ? "hide" : ""}`}>
      {isLoading ? null : (
        <Accordion>
          <AccordionSelectDevices
            header="Source"
            eventKey="0"
            items={mediaDevices}
            onSelect={(item) => {
              webcamContext.setId(item.deviceId);
            }}
          />
        </Accordion>
      )}
      <QrCode addressUrl={addressUrl} />
    </div>
  );
}
