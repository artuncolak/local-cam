import { Button, Spinner } from "react-bootstrap";

interface ControlsProps {
  isStarted: boolean;
  isStarting: boolean;
  handleServer: () => void;
}

export default function Controls({
  isStarted,
  isStarting,
  handleServer,
}: ControlsProps) {
  return (
    <>
      <Button size="lg" onClick={handleServer}>
        {isStarting ? <Spinner animation="border" /> : null}
        {isStarted ? "Durdur" : "Başlat"}
      </Button>
    </>
  );
}
