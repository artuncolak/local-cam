import { Button, Container } from "react-bootstrap";
import Webcam from "./components/Webcam";
import serverService from "./services/serverService";

export default function App() {
  const handleStartServer = async () => {
    const port = await serverService.start();
    console.log(port);
  };

  return (
    <Container className="text-center h-100 d-flex flex-column justify-content-center align-items-center">
      <Webcam />
      <Button size="lg" className="mt-5" onClick={handleStartServer}>
        Başlat
      </Button>
    </Container>
  );
}
