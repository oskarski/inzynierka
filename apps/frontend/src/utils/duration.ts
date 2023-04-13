export class Duration {
  private constructor(private readonly milliseconds: number) {}

  static fromSeconds(seconds: number): Duration {
    return new Duration(seconds * 1000);
  }

  private getFullHours(): number {
    const seconds = this.milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    return Math.floor(hours);
  }

  private getFullMinutesAfterFullHour(): number {
    const seconds = this.milliseconds / 1000;
    const minutes = seconds / 60;
    const fullHours = this.getFullHours();
    const fullHoursInMinutes = fullHours * 60;

    return Math.floor(minutes) - fullHoursInMinutes;
  }

  format(format: 'H:MM'): string {
    const fullMinutesAfterFullHour = this.getFullMinutesAfterFullHour();
    const zeroBasedMinutes =
      fullMinutesAfterFullHour < 10
        ? `0${fullMinutesAfterFullHour}`
        : `${fullMinutesAfterFullHour}`;

    if (format === 'H:MM') return `${this.getFullHours()}:${zeroBasedMinutes}`;

    throw new Error(`Unknown format "${format}"!`);
  }
}
