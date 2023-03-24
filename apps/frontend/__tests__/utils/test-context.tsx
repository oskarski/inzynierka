import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { AppProvider } from '@fe/AppProvider';
import { TestApi } from './api';

export class TestContext {
  private __container: HTMLElement | null = null;

  public readonly api: TestApi = new TestApi();

  get container(): HTMLElement {
    if (!this.__container)
      throw new Error('render() method has not been called!');

    return this.__container;
  }

  async render(children: ReactNode): Promise<TestContext> {
    const result = render(<AppProvider api={this.api}>{children}</AppProvider>);

    this.__container = result.container;

    return this;
  }
}
