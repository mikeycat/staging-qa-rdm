import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { TestCase } from ".";

@Entity()
export class ActiveTest {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 100, nullable: true })
    hash?: string;

    @OneToOne(type => TestCase)
    @JoinColumn()
    test_case?: TestCase;
}