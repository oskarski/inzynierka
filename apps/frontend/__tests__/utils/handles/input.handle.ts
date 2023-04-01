import {
  findByTestId,
  findByText,
  getByLabelText,
  Matcher,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export class InputHandle {
  private constructor(
    private readonly inputElement: HTMLInputElement,
    private readonly container: HTMLElement
  ) {}

  static fromLabel(container: HTMLElement, label: Matcher): InputHandle {
    const inputElement = getByLabelText<HTMLInputElement>(container, label);

    return new InputHandle(inputElement, container);
  }

  async clear(): Promise<this> {
    await userEvent.clear(this.inputElement);

    return this;
  }

  async type(text: string): Promise<this> {
    await userEvent.type(this.inputElement, text);

    return this;
  }

  async clearAndType(text: string): Promise<this> {
    await this.clear();
    await this.type(text);

    return this;
  }

  async hasErrorMessage(errorMessage: string): Promise<this> {
    const errorMessageElement = await findByTestId(
      this.container,
      `error-msg-${this.inputElement.getAttribute('id')}`
    );
    await findByText(errorMessageElement, errorMessage, {}, { timeout: 10000 });

    return this;
  }
}
