import { Id } from '@lib/shared';
import { IamController } from '../app/iam/iam.controller';
import { TestContext } from './utils';
import { UserStatus } from '../app/iam/entities';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(IamController.name, () => {
  beforeEach(async () => {
    await testCtx.repositories.userRepository
      .createQueryBuilder()
      .delete()
      .execute();
  });

  describe('signUp()', () => {
    it('allows to sign up', async () => {
      testCtx.cognitoAdapter.signUp.mockResolvedValue(
        Promise.resolve(Id('813c7a78-8971-4aed-be7d-064331b860b8')),
      );

      const signUpDto = {
        email: 'example@example.com',
        password: '1qaz@WSX',
        firstName: 'Jan',
        lastName: 'Kowalski',
      };

      const userId = await testCtx.controllers.iamController.signUp(signUpDto);

      expect(testCtx.cognitoAdapter.signUp).toHaveBeenCalledWith(signUpDto);
      expect(userId).toBe('813c7a78-8971-4aed-be7d-064331b860b8');

      const user = await testCtx.repositories.userRepository.findOneById(
        userId,
      );

      expect(user.status).toBe(UserStatus.notConfirmed);
    });
  });

  describe('confirmSignUp()', () => {
    it('allows to confirm sign up', async () => {
      testCtx.cognitoAdapter.signUp.mockResolvedValue(
        Promise.resolve(Id('813c7a78-8971-4aed-be7d-064331b860b8')),
      );

      const userId = await testCtx.controllers.iamController.signUp({
        email: 'example@example.com',
        password: '1qaz@WSX',
        firstName: 'Jan',
        lastName: 'Kowalski',
      });

      await testCtx.controllers.iamController.confirmSignUp(userId, {
        email: 'example@example.com',
        code: '123456',
      });

      expect(testCtx.cognitoAdapter.confirmSignUp).toHaveBeenCalledWith({
        email: 'example@example.com',
        code: '123456',
      });

      const user = await testCtx.repositories.userRepository.findOneById(
        userId,
      );

      expect(user.status).toBe(UserStatus.confirmed);
    });
  });
});
