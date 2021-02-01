import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { constant } from '../../../constants';
import { DocumentsStatus } from '../documentStatus.enum';

@Entity()
export class Driver {
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
    default: constant.IMAGE_DEFAULT_URL,
  })
  profileImage: string;

  @Column({
    length: 15,
    unique: true,
  })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column('text', { array: true, default: () => 'array[]::text[]' })
  documents: string[];

  @Column({ default: DocumentsStatus.NOT_PROVIDED })
  documentsStatus: string;
}
