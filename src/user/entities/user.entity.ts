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

<<<<<<< HEAD
  password: string;

  @Column({ 
    length: 15,
    unique: true
   })
  phoneNumber: string;
=======
  @Column({ length: 60 })
  password: string;
>>>>>>> e6b7fab864a73e7cf981ec6196d2205391e9e6f2
}
