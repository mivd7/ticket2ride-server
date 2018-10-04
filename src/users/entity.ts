import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcryptjs'
import Event from '../events/entity'
import {Ticket} from '../tickets/entity';
import Comment from '../comments/entity'
import { IsString, IsEmail, MinLength } from 'class-validator';


@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @Column('text', { nullable:true })
  firstName: string

  @IsString()
  @Column('text', { nullable:true })
  lastName: string

  @IsEmail()
  @Column('text', { nullable:false })
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:false })
  @Exclude({toPlainOnly:true})
  password: string

  @Column('boolean',{default: false})
  @Exclude({ toPlainOnly: true })
  admin: boolean

  @OneToMany(_ => Event, event => event.user)
  events: Event[]

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[]

  @OneToMany(_ => Comment, comment => comment.user)
  comments: Comment[]

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