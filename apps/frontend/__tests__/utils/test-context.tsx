import { ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { AppProvider } from '@fe/AppProvider';
import { TestApi } from './api';
import * as nextRouter from 'next/router';

const useRouterMock = jest.fn();

// @ts-ignore
nextRouter.useRouter = useRouterMock;

export class TestContext {
  private __container: HTMLElement | null = null;

  public readonly api: TestApi = new TestApi();
  private readonly routePushMock = jest.fn<Promise<void>, [string]>();

  constructor() {
    useRouterMock.mockReturnValue({ push: this.routePushMock });
  }

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

  async redirectsTo(to: string): Promise<this> {
    await waitFor(() => expect(this.routePushMock).toHaveBeenCalledWith(to));

    return this;
  }
}
