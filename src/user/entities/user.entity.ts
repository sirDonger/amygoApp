import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  password: string;

  @Column({ length: 60 })
  confirm_pass: string;
}
