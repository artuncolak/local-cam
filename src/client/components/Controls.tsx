import { shell } from "electron";
import { Button, Spinner } from "react-bootstrap";

interface ControlsProps {
  serverDetails: string;
  isStarted: boolean;
  isStarting: boolean;
  handleServer: () => void;
}

export default function Controls({
  serverDetails,
  isStarted,
  isStarting,
  handleServer,
}: ControlsProps) {
  return (
    <>
      {isStarted ? (
        <p className="text-success mt-3">
          Sunucu{" "}
          <span
            className="server-details"
            onClick={() => {
              shell.openExternal(serverDetails);
            }}
          >
            {serverDetails}
          </span>{" "}
          adresinde başlatıldı.
        </p>
      ) : null}
      <Button size="lg" onClick={handleServer}>
        {isStarting ? <Spinner animation="border" /> : null}
        {isStarted ? "Durdur" : "Başlat"}
      </Button>
    </>
  );
}
