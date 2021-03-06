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
    <div className="mt-3 controls-container w-100 text-center">
      <Button size="lg" onClick={handleServer}>
        {isStarting ? (
          <Spinner animation="border" />
        ) : isStarted ? (
          "Stop Streaming"
        ) : (
          "Start Streaming"
        )}
      </Button>
    </div>
  );
}
