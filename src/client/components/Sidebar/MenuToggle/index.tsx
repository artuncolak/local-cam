import { useState } from "react";
import { ChevronLeft } from "react-feather";

interface MenuToggleProps {
  onToggle: (isToggled: boolean) => void;
}

export default function MenuToggle({ onToggle }: MenuToggleProps) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={`menu-toggle p-2 ${isToggled ? "expand" : ""}`}>
      <ChevronLeft
        size={30}
        className={`icon ${isToggled ? "reverse" : ""}`}
        onClick={() => {
          setIsToggled(!isToggled);
          onToggle(!isToggled);
        }}
      />
    </div>
  );
}
