import '@testing-library/jest-dom';
import SignUpPage from '@fe/pages/sign-up';
import { ButtonHandle, InputHandle, TestContext } from '../utils';
import { waitFor } from '@testing-library/react';
import { Id, UserId } from '@lib/shared';

const testContext = new TestContext();

beforeEach(() => {
  testContext.api.iamApi.signUp.mockResolvedValue(
    Id<UserId>('db9a4db9-d0c6-44f6-9890-a7396369fdfd')
  );
});

describe(SignUpPage.name, () => {
  it('allows to sign up', async () => {
    await testContext.notSignedIn().renderPublicPage(<SignUpPage />);

    const firstNameInput = InputHandle.fromLabel(
      testContext.container,
      /^Imię$/
    );
    const lastNameInput = InputHandle.fromLabel(
      testContext.container,
      /^Nazwisko$/
    );
    const emailInput = InputHandle.fromLabel(testContext.container, /^Email$/);
    const passwordInput = InputHandle.fromLabel(
      testContext.container,
      /^Hasło$/
    );
    const submitBtn = ButtonHandle.fromText(
      testContext.container,
      /^Zarejestruj$/
    );

    await submitBtn.submitForm();

    await firstNameInput.hasErrorMessage('Pole wymagane');
    await lastNameInput.hasErrorMessage('Pole wymagane');
    await emailInput.hasErrorMessage('Pole wymagane');
    await passwordInput.hasErrorMessage('Pole wymagane');

    await firstNameInput.type('Oskar');
    await lastNameInput.type('Kupski');
    await emailInput.type('s20506');
    await passwordInput.type('!');
    await submitBtn.submitForm();

    await emailInput.hasErrorMessage('Podana wartość nie jest adresem email');
    await passwordInput.hasErrorMessage('Hasło musi mieć minimum 8 znaków');

    await emailInput.clearAndType('s20506@pjwstk.edu.pl');
    await passwordInput.clearAndType('!!!!!!!!!');
    await submitBtn.submitForm();

    await passwordInput.hasErrorMessage('Hasło musi zawierać małą literę');
    await passwordInput.clearAndType('!!!!!!!a');
    await submitBtn.submitForm();

    await passwordInput.hasErrorMessage('Hasło musi zawierać wielką literę');
    await passwordInput.clearAndType('!!!!!!aA');
    await submitBtn.submitForm();

    await passwordInput.hasErrorMessage('Hasło musi zawierać cyfrę');
    await passwordInput.clearAndType('!!!!!aA1');
    await submitBtn.submitForm();

    await waitFor(() =>
      expect(testContext.api.iamApi.signUp).toHaveBeenCalledWith({
        firstName: 'Oskar',
        lastName: 'Kupski',
        email: 's20506@pjwstk.edu.pl',
        password: '!!!!!aA1',
      })
    );
    await testContext.redirectsTo(
      '/sign-up/db9a4db9-d0c6-44f6-9890-a7396369fdfd/confirm?email=czIwNTA2QHBqd3N0ay5lZHUucGw='
    );
  });
});
