import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}

export const WebcamContext = createContext<Partial<ContextProps>>({});

export default function WebcamContextProvider({ children }) {
  const [id, setId] = useState<string>();
  const [url, setUrl] = useState<string>();

  const values = {
    id,
    setId,
    url,
    setUrl,
  };

  return (
    <WebcamContext.Provider value={values}>{children}</WebcamContext.Provider>
  );
}
