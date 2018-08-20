import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { TestSuite, Browser, OperatingSystem, Result, Notification } from '.';

@Entity()
export class TestCase {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "date", nullable: true })
    date?: Date;

    @Column({ type: "int", nullable: true })
    passed?: number;

    @Column({ type: "int", nullable: true })
    failed?: number;

    @Column({ type: "int", nullable: true })
    error?: number;

    @ManyToOne(type => TestSuite, test_suite => test_suite.test_cases)
    test_suite?: TestSuite;

    @ManyToOne(type => Browser, browser => browser.test_cases)
    browser?: Browser;

    @ManyToOne(type => OperatingSystem, operating_system => operating_system.test_cases)
    operating_system?: OperatingSystem;

    @OneToMany(type => Notification, notification => notification.test_case )
    notifications?: Notification[];

    @ManyToMany(type => Result, result => result.test_cases)
    @JoinTable()
    results?: Result[];
}