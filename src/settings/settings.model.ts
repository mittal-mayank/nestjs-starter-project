import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Account } from '../accounts/accounts.model';

@Table({
  tableName: 'settings',
  timestamps: true,
  paranoid: true,
})
export class Setting extends Model<Setting> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('string', 'number', 'boolean'),
  })
  data_type: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  value: string;

  @ForeignKey(() => Account)
  @AllowNull(false)
  @Column
  account_id: number;

  @BelongsTo(() => Account, 'id')
  account: Account;

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;
}
