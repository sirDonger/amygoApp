export class ChangeProfileDto {
  readonly name: string;

  readonly surname: string;

  readonly email: string;

  profileImage: string;

  phoneNumber: string;

  //TODO which field should be changeable
  emergencyContact: string;
}
