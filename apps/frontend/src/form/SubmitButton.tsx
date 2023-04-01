import { Button } from 'antd-mobile';
import { ComponentProps } from 'react';

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button
      block={true}
      type="submit"
      color="primary"
      size="large"
      {...props}
    />
  );
};
