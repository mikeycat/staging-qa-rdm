import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OperatingSystem } from './';

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 100 })
    name?: string;

    @Column({ type: "varchar", length: 100 })
    value?: string;

    @OneToMany( type => OperatingSystem, operating_systems => operating_systems.platform )
    operating_systems?: OperatingSystem[];
}