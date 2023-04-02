import '@testing-library/jest-dom';
import SignInPage from '@fe/pages/sign-in';
import { ButtonHandle, InputHandle, TestContext } from '../utils';
import { waitFor } from '@testing-library/react';
import { SignedInUserDtoBuilder } from '../dto-builders';

const testContext = new TestContext();

testContext.api.iamApi.signIn.mockResolvedValue(
  SignedInUserDtoBuilder.prefilled().build()
);

describe(SignInPage.name, () => {
  it('allows to sign in', async () => {
    await testContext.notSignedIn().render(<SignInPage />);

    const emailInput = InputHandle.fromLabel(testContext.container, /^Email$/);
    const passwordInput = InputHandle.fromLabel(
      testContext.container,
      /^Hasło$/
    );
    const submitBtn = ButtonHandle.fromText(testContext.container, /^Zaloguj$/);

    await submitBtn.submitForm();

    await emailInput.hasErrorMessage('Pole wymagane');
    await passwordInput.hasErrorMessage('Pole wymagane');

    await emailInput.type('s20506');
    await passwordInput.type('1111');
    await submitBtn.submitForm();

    await emailInput.hasErrorMessage('Podana wartość nie jest adresem email');

    await emailInput.clearAndType('s20506@pjwstk.edu.pl');
    await submitBtn.submitForm();

    await waitFor(() =>
      expect(testContext.api.iamApi.signIn).toHaveBeenCalledWith({
        email: 's20506@pjwstk.edu.pl',
        password: '1111',
      })
    );
    await testContext.redirectsTo('/');
  });
});
