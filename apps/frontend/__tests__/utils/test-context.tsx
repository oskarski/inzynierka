import { ReactNode } from 'react';
import { findByTestId, render, waitFor } from '@testing-library/react';
import { AppProvider } from '@fe/AppProvider';
import { TestApi } from './api';
import * as nextRouter from 'next/router';
import { SignedInUserDtoBuilder } from '../dto-builders';
import { QueryClient } from 'react-query';
import { AppPopup } from '@fe/components';

const useRouterMock = jest.fn();

// @ts-ignore
nextRouter.useRouter = useRouterMock;

const testAppQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

export class TestContext {
  private __container: HTMLElement | null = null;

  public readonly api: TestApi = new TestApi();
  private readonly routePushMock = jest.fn<Promise<void>, [string]>();
  private __routerQuery: Record<string, string> = {};

  constructor() {}

  get container(): HTMLElement {
    if (!this.__container)
      throw new Error('render() method has not been called!');

    return this.__container;
  }

  havingQueryParam(name: string, value: string): this {
    this.__routerQuery = { ...this.__routerQuery, [name]: value };

    return this;
  }

  signedIn(
    builder: SignedInUserDtoBuilder = SignedInUserDtoBuilder.prefilled()
  ): this {
    this.api.iamApi.signedInUser.mockResolvedValue(builder.build());

    return this;
  }

  notSignedIn(): this {
    this.api.iamApi.signedInUser.mockResolvedValue(null);

    return this;
  }

  private async render(
    children: ReactNode,
    { isPublicPage }: { isPublicPage: boolean }
  ): Promise<TestContext> {
    useRouterMock.mockReturnValue({
      push: this.routePushMock,
      query: this.__routerQuery,
    });

    const result = render(
      <AppProvider
        api={this.api}
        queryClient={testAppQueryClient}
        isPublicPage={isPublicPage}
      >
        {children}
        <div data-testid="test-app" />
      </AppProvider>
    );

    this.__container = result.container;

    // Wait for async stuff
    await findByTestId(this.container, /^test-app$/);

    return this;
  }

  async renderPublicPage(children: ReactNode): Promise<TestContext> {
    return this.render(children, { isPublicPage: true });
  }

  async renderPrivatePage(children: ReactNode): Promise<TestContext> {
    return this.render(children, { isPublicPage: false });
  }

  async renderPrivatePopup(children: ReactNode): Promise<TestContext> {
    await this.renderPrivatePage(
      <AppPopup defaultOpened={true}>{children}</AppPopup>
    );

    this.__container = document.body;

    return this;
  }

  async redirectsTo(to: string): Promise<this> {
    await waitFor(() => expect(this.routePushMock).toHaveBeenCalledWith(to));

    return this;
  }
}
