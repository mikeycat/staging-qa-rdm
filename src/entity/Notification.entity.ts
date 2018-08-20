import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { User, TestCase } from './';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne( type => TestCase, test_case => test_case.notifications )
    @JoinTable()
    test_case?: TestCase;

    @ManyToOne( type => User, user => user.sessions )
    @JoinTable()
    user?: User;
}