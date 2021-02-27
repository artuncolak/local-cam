import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  fps: number;
  setFps: Dispatch<SetStateAction<number>>;
}

export const WebcamContext = createContext<Partial<ContextProps>>({});

export default function WebcamContextProvider({ children }) {
  const [id, setId] = useState("");
  const [fps, setFps] = useState(15);

  return (
    <WebcamContext.Provider value={{ id, setId, fps, setFps }}>
      {children}
    </WebcamContext.Provider>
  );
}
