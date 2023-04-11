import { fireEvent, getByText, Matcher } from '@testing-library/react';

export class ButtonHandle {
  private constructor(private readonly buttonElement: HTMLButtonElement) {}

  static fromText(container: HTMLElement, buttonText: Matcher): ButtonHandle {
    return new ButtonHandle(getByText(container, buttonText));
  }

  async submitForm(): Promise<void> {
    fireEvent.submit(this.buttonElement);
  }

  click(): void {
    fireEvent.click(this.buttonElement);
  }
}
