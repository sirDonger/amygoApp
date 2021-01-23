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

<<<<<<< HEAD
<<<<<<< HEAD
=======
  @Column({
    length: 60,
  })
>>>>>>> 3fe03612122fb5c855c75029587ffc03308b5daa
  password: string;

  @Column({
    length: 15,
    unique: true,
  })
  phoneNumber: string;
<<<<<<< HEAD
=======
  @Column({ length: 60 })
  password: string;
>>>>>>> e6b7fab864a73e7cf981ec6196d2205391e9e6f2
=======
>>>>>>> 3fe03612122fb5c855c75029587ffc03308b5daa
}
