import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  // BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDepartment, UserRole } from 'src/api/types';

//create user schema
@Entity('teltonika_users')
export class UserModel {
  // private temPassword = ''; //will serve as password template

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /******************************* */
  @Column({ unique: true })
  username: string;

  /******************************* */
  @Column()
  password: string;

  /******************************* */
  @Column({
    type: 'enum',
    enum: UserDepartment,
    default: UserDepartment.OTHERS,
  })
  userDep: UserDepartment;

  /******************************* */
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  //before inserting/updating user, hash password ************
  @BeforeInsert()
  //@BeforeUpdate() //Hhmm actually useless ? cuz aint doing shiet 🤔
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
