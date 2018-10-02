import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {User} from '../users/entity'
import {Ticket} from '../tickets/entity';
import { Exclude } from 'class-transformer';
 

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text',{nullable:true})
  name: string

  @Column('text',{nullable:true})
  description: string

  @Column('text',{nullable:true})
  image: string

  @Column({type: 'date', nullable: true})
  startdate: Date

  @Column({type: 'date', nullable: true})
  enddate: Date

  @Exclude({toPlainOnly:true})
  @ManyToOne(_ => User, user => user.events)
  user: User

  @OneToMany(_=> Ticket, ticket => ticket.event )
  tickets: Ticket[]
}