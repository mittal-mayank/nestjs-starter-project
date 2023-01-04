import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './settings.model';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting)
    private readonly settingsModel: typeof Setting,
  ) {}

  async findById(id: number): Promise<Setting> {
    const setting: Setting = await this.settingsModel.findOne({
      where: { id },
    });
    return setting.dataValues;
  }

  create(setting: CreateSettingDto): Promise<Setting> {
    try {
      return this.settingsModel.create({ ...setting });
    } catch (err) {
      return null;
    }
  }

  async updateById(id: number, setting: UpdateSettingDto): Promise<Setting> {
    try {
      const result: [number, Setting[]] = await this.settingsModel.update(
        {
          ...setting,
        },
        {
          where: { id },
          returning: true,
        },
      );
      return result[1][0];
    } catch (err) {
      return null;
    }
  }

  async deleteById(id: number): Promise<boolean> {
    const affected = await this.settingsModel.destroy({
      where: { id },
    });
    return affected > 0;
  }
}
