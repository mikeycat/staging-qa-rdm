import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { Browser, TestCase, Platform } from '.';

@Entity()
export class OperatingSystem {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 45, unique: true })
    name?: string;

    @Column({ type: "varchar", length: 1, unique: true })
    value?: string;

    @ManyToOne( type => Platform, platform => platform.operating_systems )
    @JoinTable()
    platform?: Platform;

    @ManyToMany(type => Browser, browser => browser.operating_systems)
    // @JoinTable() // Is not the owner
    browsers?: Browser[];

    @OneToMany(type => TestCase, test_case => test_case.operating_system)
    test_cases?: TestCase[];
}