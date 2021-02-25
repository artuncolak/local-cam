import { Button, Container } from "react-bootstrap";
import Webcam from "./components/Webcam";

export default function App() {
  return (
    <Container className="text-center h-100 d-flex flex-column justify-content-center align-items-center">
      <Webcam />
      <Button size="lg" className="mt-5">
        Başlat
      </Button>
    </Container>
  );
}
