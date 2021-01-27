export enum ValidationMessagesEnum {
  NAME = 'Name should be a string with max length of 40 characters',
  EMAIL = 'Email should be valid',
  PASSWORD = 'Password should consist of at least one Capital letter, one small,' +
    ' one digit, one special symbol, and have length more than 8 characters. Password ' +
    'should be shorter than 60 characters Example: Password123#.',
  CONFIRM_PASSWORD = ' Password and confirm password should match.',
}
