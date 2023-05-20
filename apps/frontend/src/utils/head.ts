const appName = 'Cook Mate';

export const headTitle = (pageTitle?: string): string => {
  if (pageTitle) return `${appName} | ${pageTitle}`;

  return appName;
};
