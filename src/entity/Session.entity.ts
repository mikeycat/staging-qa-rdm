import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { User } from './';

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 50, unique: true })
    session?: string;

    @ManyToOne( type => User, user => user.sessions )
    @JoinTable()
    user?: User;
}