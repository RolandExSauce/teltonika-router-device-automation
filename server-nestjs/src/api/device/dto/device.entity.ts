import {
  Entity,
  ChildEntity,
  TableInheritance,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { encryptPassword } from 'src/utils/secure.credentials';
import { DeviceModell } from 'src/api/types';

// DeviceConfigStatus
class DeviceConfigStatus {
  //will this always keep the last inserted time ?, not sure yet
  @CreateDateColumn()
  lastTimeFirmwareUpgraded: Date;

  @CreateDateColumn()
  lastTimeSDKRestored: Date;

  @CreateDateColumn()
  lastTimeDataModified: Date;

  /***********************************/
  @Column()
  lastUpgradedFirmwareVersionFile?: string;

  @Column()
  lastUploadedSDKFile?: string;
  /***********************************/
  @Column()
  deviceIsInDB: boolean;

  @Column()
  importedFromCSV: boolean = false; //by default when configuring router, this is set to false, unless we are importing via csv file then change

  //pre initialze potentially null fields
  constructor() {
    //preset some of these fields
    this.lastUpgradedFirmwareVersionFile =
      this.lastUpgradedFirmwareVersionFile ?? 'not available';
    this.lastUploadedSDKFile = this.lastUploadedSDKFile ?? 'not available';
  }
}

//base entity device with mandatory fields
@Entity('router_devices')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class BaseRouterModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DeviceModell,
  })
  modell: DeviceModell;

  @Column()
  wifiSSID: string;

  @Column({ default: 'admin' })
  webUser: string; //user for webcli

  @Column({ default: 'root' })
  shellUser: string; //user for shell, e.g putty cli

  @Column()
  passForShellUser: string;

  @Column()
  passForWebUser: string;

  @Column()
  passWifi: string;

  //column will be of type DeviceConfigStatus,
  //this technique is called: "embedded entities"
  @Column(() => DeviceConfigStatus)
  configStatus: DeviceConfigStatus;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    this.passForShellUser = await encryptPassword(this.passForShellUser);
    this.passForWebUser = await encryptPassword(this.passForWebUser);
    this.passWifi = await encryptPassword(this.passWifi);
  }

  // method to (partially) update config status properties
  updateConfigStatus(propsToUpdate: Partial<DeviceConfigStatus>) {
    this.configStatus = {
      ...this.configStatus,
      ...propsToUpdate,
    };
  }
}

//all instances of DeviceWithMoreInfo (which means all devices) will be saved into router_devices,
//in get device resolvers => apply a filter to retrieve devices based on modells
//extend base entity class BaseRouterModell with more optional fields
@ChildEntity()
@Index(['serialNumber', 'SIMID', 'IMEI', 'LAN_MAC', 'ipAdress'], {
  unique: true,
}) //DwMI_unique stands for: "device with More info", make all fields unique
export class SuperRouterModel extends BaseRouterModel {
  @Column({ nullable: true, length: 100 })
  serialNumber?: string;

  @Column({ nullable: true, length: 100 })
  SIMID?: string;

  @Column({ nullable: true, length: 100 })
  IMEI?: string;

  @Column({ nullable: true, length: 100 })
  LAN_MAC?: string;

  @Column({ nullable: true, length: 100 })
  ipAdress?: string;

  //pre - initialize potentially null fields
  constructor() {
    super(); // call super, set to 'not available' only if props are null
    this.serialNumber = this.serialNumber ?? 'not available';
    this.SIMID = this.SIMID ?? 'not available';
    this.IMEI = this.IMEI ?? 'not available';
    this.LAN_MAC = this.LAN_MAC ?? 'not available';
    this.ipAdress = this.ipAdress ?? 'not available';
  }
}
