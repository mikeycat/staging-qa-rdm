import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from './';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 100 })
    name?: string;

    @ManyToMany(type => User, user => user.roles)
    users?: User[];
}