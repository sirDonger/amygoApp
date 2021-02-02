import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class PreorderTrip {
  @PrimaryGeneratedColumn('uuid')
  preorderTripId: string;

  @Column()
  when: Date;

  @Column()
  where: string;

  @Column()
  from: string;

  @Column()
  numberOfPeople: number;

  @ManyToOne(() => User, (user) => user.preorderTrips)
  user: string;

  @Column({ nullable: true })
  driverId: string;

  @Column({ default: false })
  isAccepted: boolean;

  @Column({ default: new Date(Date.now()) })
  orderedAt: string;
}
