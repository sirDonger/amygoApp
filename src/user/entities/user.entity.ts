import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @MaxLength(30)
  name: string;

  @Column()
  surname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    length: 15,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    length: 60,
  })
  password: string;
}