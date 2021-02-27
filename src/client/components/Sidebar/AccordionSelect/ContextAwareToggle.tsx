import { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Card,
  useAccordionToggle,
} from "react-bootstrap";
import { ChevronDown } from "react-feather";

interface ContextAwareToggleProps {
  eventKey: string;
  callback?: (eventKey: string) => void;
  selected: string;
  header: string;
}

export default function ContextAwareToggle({
  eventKey,
  callback,
  selected,
  header,
}: ContextAwareToggleProps) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Accordion.Toggle
      as={Card.Header}
      onClick={decoratedOnClick}
      eventKey={eventKey}
    >
      {header}
      <h6 className="mt-2">
        <strong>
          {selected}{" "}
          <span className="float-right">
            <ChevronDown
              className={`icon ${isCurrentEventKey ? "toggled" : ""}`}
            />
          </span>
        </strong>
      </h6>
    </Accordion.Toggle>
  );
}
