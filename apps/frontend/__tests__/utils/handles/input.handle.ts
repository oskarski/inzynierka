import { getByLabelText, Matcher } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export class InputHandle {
  private constructor(private readonly inputElement: HTMLInputElement) {}

  static fromLabel(container: HTMLElement, label: Matcher): InputHandle {
    const inputElement = getByLabelText<HTMLInputElement>(container, label);

    return new InputHandle(inputElement);
  }

  async type(text: string): Promise<this> {
    await userEvent.type(this.inputElement, text);

    return this;
  }
}
