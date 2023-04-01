export const validationMessages = {
  required: 'Pole wymagane',
  notAnEmail: 'Podana wartość nie jest adresem email',
  minLength: (min: number, name: string) =>
    `${name} musi mieć minimum ${min} znaków`,
  length: (length: number, name: string) =>
    `${name} musi mieć ${length} znaków`,
  mustContainLowerCaseLetter: (name: string) =>
    `${name} musi zawierać małą literę`,
  mustContainUpperCaseLetter: (name: string) =>
    `${name} musi zawierać wielką literę`,
  mustContainDigit: (name: string) => `${name} musi zawierać cyfrę`,
};
