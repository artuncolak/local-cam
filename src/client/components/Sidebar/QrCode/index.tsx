import { shell } from "electron";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

interface SidebarProps {
  addressUrl: string;
}

export default function QrCode({ addressUrl }: SidebarProps) {
  const [qrCodeImage, setQrCodeImage] = useState<string>("");

  useEffect(() => {
    const generateQrCode = async () => {
      if (addressUrl) {
        setQrCodeImage(
          await QRCode.toDataURL(addressUrl, { scale: 10, margin: 2 })
        );
      } else {
        setQrCodeImage(null);
      }
    };
    generateQrCode();
  }, [addressUrl]);

  if (!addressUrl) {
    return null;
  }

  return (
    <div className="qrcode position-absolute d-flex flex-column justify-content-center align-items-center">
      <img src={qrCodeImage} alt="qr-code" className="rounded border" />
      <a
        className="mt-2"
        onClick={() => {
          shell.openExternal(addressUrl);
        }}
      >
        {addressUrl}
      </a>
    </div>
  );
}
