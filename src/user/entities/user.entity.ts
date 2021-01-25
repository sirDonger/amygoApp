import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    default: 'https://www.freedigitalphotos.net/images/img/homepage/394230.jpg',
  })
  profileImage: string;

  @Column({
    length: 15,
    unique: true,
  })
  phoneNumber: string;

  @Column()
  password: string;
}
