import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { OperatingSystem, TestCase } from '.';

@Entity()
export class Browser {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 45, unique: true })
    name?: string;

    @Column({ type: "varchar", length: 10, unique: true })
    value?: string;

    @ManyToMany(type => OperatingSystem, operating_system => operating_system.browsers)
    @JoinTable() // Is the owner
    operating_systems?: OperatingSystem[];

    @OneToMany(type => TestCase, test_case => test_case.browser)
    test_cases?: TestCase[];
}