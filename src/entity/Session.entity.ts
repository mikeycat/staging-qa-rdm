import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 50, unique: true })
    session?: string;

    @Column({ type: "varchar", length: 100, unique: true })
    token?: string;
}