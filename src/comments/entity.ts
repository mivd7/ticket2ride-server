import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import {User} from '../users/entity';
import {Ticket} from '../tickets/entity';
 

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text',{nullable:true})
  message: string;

  @CreateDateColumn({type: 'timestamp'})
  timeOfCreation: Date;

  @ManyToOne(_ => User, user => user.comments)
  user: User;

  @ManyToOne(_=> Ticket, ticket => ticket.comments, { onDelete: 'CASCADE' })
  ticket: Ticket;
}