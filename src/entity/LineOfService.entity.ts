import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TestSuite } from './';

@Entity()
export class LineOfService {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 100 })
    name?: string;

    @OneToMany(type => TestSuite, test_suite => test_suite.line_of_service)
    test_suites?: TestSuite[];
}
