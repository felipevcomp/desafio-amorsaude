/**
 *
 */
export class EventData {
  name: string;
  value: any;

  /**
   *
   * @param name
   * @param value
   */
  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }
}