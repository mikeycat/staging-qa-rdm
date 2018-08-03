import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { TestCase, LineOfService } from "./";

@Entity()
export class TestSuite {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 45, unique: true })
    name?: string;

    @Column({ type: "int" })
    app_id?: number;

    @Column({ type: "int" })
    app_code?: number;

    @Column({ type: "int" })
    test_suite?: number;

    @OneToMany(type => TestCase, test_case => test_case.test_suite)
    test_cases?: TestCase[];

    @ManyToOne(type => LineOfService, line_of_service => line_of_service.test_suites)
    @JoinTable()
    line_of_service?: LineOfService;
}
