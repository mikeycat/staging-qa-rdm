import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Role, Session } from './';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 100 })
    uid?: string;

    @Column({ type: "varchar", length: 150 })
    email?: string;

    @ManyToMany(type => Role, role => role.users)
    @JoinTable() // Is the owner
    roles?: Role[];

    @OneToMany(type => Session, session => session.user)
    sessions?: Session[];
}