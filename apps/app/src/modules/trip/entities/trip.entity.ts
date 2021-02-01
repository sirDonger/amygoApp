import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';

@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    numberPeople: number;

    @Column()
    price: number;

    @ManyToOne(() => Driver, trip => Trip)
    driver: Driver

}