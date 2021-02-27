import { useState } from "react";
import { Accordion, Card, ListGroup } from "react-bootstrap";
import { CheckCircle, Circle } from "react-feather";

import AccordionSelectProps from "./AccordionSelectProps";
import ContextAwareToggle from "./ContextAwareToggle";

export default function AccordionSelectDevices({
  header,
  items,
  eventKey,
  onSelect,
}: AccordionSelectProps<MediaDeviceInfo>) {
  const [
    selectedMediaDevice,
    setSelectedMediaDevice,
  ] = useState<MediaDeviceInfo>(items[0]);

  return (
    <Card className="accordion-select">
      <ContextAwareToggle
        eventKey={eventKey}
        header={header}
        selected={selectedMediaDevice.label}
      />
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <ListGroup variant="flush">
            {items.map((item, index) => (
              <ListGroup.Item
                action
                key={index}
                onClick={() => {
                  setSelectedMediaDevice(item);
                  onSelect(item);
                }}
                className={selectedMediaDevice == item ? "selected" : ""}
              >
                <span className="mr-2">
                  {selectedMediaDevice == item ? (
                    <CheckCircle size="15" />
                  ) : (
                    <Circle size="15" />
                  )}
                </span>
                {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
