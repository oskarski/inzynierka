import '@testing-library/jest-dom';
import SignUpConfirmPage from '@fe/pages/sign-up/confirm';
import { ButtonHandle, InputHandle, TestContext } from '../utils';
import { waitFor } from '@testing-library/react';

const testContext = new TestContext();

testContext.api.iamApi.confirmSignUp.mockResolvedValue();

describe(SignUpConfirmPage.name, () => {
  it('allows to confirm sign-up', async () => {
    await testContext
      .havingQueryParam('email', 'czIwNTA2QHBqd3N0ay5lZHUucGw=')
      .notSignedIn()
      .render(<SignUpConfirmPage />);

    const codeInput = InputHandle.fromLabel(testContext.container, /^Kod$/);
    const submitBtn = ButtonHandle.fromText(
      testContext.container,
      /^Potwierdź$/
    );

    await submitBtn.submitForm();

    await codeInput.hasErrorMessage('Pole wymagane');

    await codeInput.type('1');
    await submitBtn.submitForm();

    await codeInput.hasErrorMessage('Kod musi mieć 6 znaków');

    await codeInput.clearAndType('1234567');
    await submitBtn.submitForm();

    await codeInput.hasErrorMessage('Kod musi mieć 6 znaków');

    await codeInput.clearAndType('123456');
    await submitBtn.submitForm();

    await waitFor(() =>
      expect(testContext.api.iamApi.confirmSignUp).toHaveBeenCalledWith({
        email: 's20506@pjwstk.edu.pl',
        code: '123456',
      })
    );
    await testContext.redirectsTo('/sign-in');
  });
});
