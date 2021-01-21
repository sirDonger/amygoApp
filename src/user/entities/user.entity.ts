import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ length: 15 })
  phoneNumber: string;
}
