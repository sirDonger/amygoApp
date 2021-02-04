import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { constant } from '../../constants';

export function DateBetween(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: DateBetweenConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'DateBetween' })
export class DateBetweenConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return (
      new Date(value).getTime() >
        new Date(Date.now() + constant.MIN_DATE_OF_PREORDER).getTime() &&
      new Date(value).getTime() <
        new Date(Date.now() + constant.MAX_DATE_OF_PREORDER).getTime()
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not correct. You can preorder not later than 1 
    hour before trip and not sooner than 1 week after current time`;
  }
}