import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Event from '../events/entity'
import {Ticket} from '../tickets/entity';
// import Comment from '../comments/entity'

@Entity()
export class User extends BaseEntity {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  userId?: number

  @Column('text', { nullable:true })
  name: string

  @Column('text', { nullable:true })
  lastName: string

  @Column('text', { nullable:true })
  email: string

  @Column('text', { nullable:true })
  @Exclude({toPlainOnly:true})
  password: string

  @Column('boolean',{default: false})
  @Exclude({ toPlainOnly: true })
  admin: boolean

  @OneToMany(_ => Event, event => event.user)
  events: Event[]

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[]

  // @OneToMany(_ => Comment, comment => comment.user)
  // comments: Comment[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

}

@Entity()
export  class Customer extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text',{nullable: true})
  userName: string

  @Column({default: 0})
  ticketsOffered: number

  @OneToOne(_ => User)
  @JoinColumn()
  user: User


}