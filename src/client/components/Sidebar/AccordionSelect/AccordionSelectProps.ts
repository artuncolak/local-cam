export default interface AccordionSelectDevicesProps<T> {
  header: string;
  items: T[];
  eventKey: string;
  onSelect: (item: T) => void;
}
