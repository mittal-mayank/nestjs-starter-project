import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { isBooleanString, isNumberString } from 'class-validator';
import { Account as User } from 'src/accounts/account.decorator';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './settings.model';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  private validateSettingValue(data_type: string, value: string) {
    if (
      (data_type === 'number' && !isNumberString(value)) ||
      (data_type === 'boolean' && !isBooleanString(value))
    ) {
      throw new BadRequestException('value type conflicts with data_type');
    }
  }

  @Post()
  async create(@User() user, @Body() createSettingDto: CreateSettingDto) {
    const { data_type, value } = createSettingDto;
    this.validateSettingValue(data_type, value);
    const setting = {
      account_id: user.id,
      ...createSettingDto,
    };
    const newSetting: Setting = await this.settingsService.create(setting);
    if (!newSetting) {
      throw new ConflictException('unable to create setting');
    }
    return newSetting;
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    const setting: Setting = await this.settingsService.findById(id);
    if (!setting) {
      throw new NotFoundException(`target setting not found`);
    }
    this.validateSettingValue(setting.data_type, updateSettingDto.value);
    const newSetting: Setting = await this.settingsService.updateById(
      id,
      updateSettingDto,
    );
    if (!newSetting) {
      throw new ConflictException('unable to update setting');
    }
    return newSetting;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    const success: boolean = await this.settingsService.deleteById(id);
    if (!success) {
      throw new NotFoundException(`target setting not found`);
    }
  }
}
