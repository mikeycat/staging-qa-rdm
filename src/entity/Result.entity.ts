import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { TestCase } from ".";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "int" })        // 1 => Failed, 2 => Error
    error_code?: number;

    @Column({ type: "text", unique: true })
    value?: string;

    @ManyToMany(type => TestCase, test_case => test_case.results)
    // @JoinTable() // Not the owner
    test_cases?: TestCase[];
}