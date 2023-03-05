const appName = 'AppName';

export const headTitle = (pageTitle?: string): string => {
  if (pageTitle) return `${appName} | ${pageTitle}`;

  return appName;
};
