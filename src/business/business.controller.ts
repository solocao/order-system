import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from '../share/joi-validation.pipe';
import { schema } from './schema/vendor.schema';
import { VendorDto } from './dto/vendor.dto';
import { BusinessService } from './business.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/role.guard';

@UseGuards(AuthGuard('bearer'))
@Controller('/v1')
export class BusinessController {

  constructor(private readonly businessService: BusinessService){}

  @Roles('admin', 'general')
  @UseGuards(RoleGuard)
  @Post('/vendor')
  create(@Body(new JoiValidationPipe(schema)) vendor: VendorDto) {
    return this.businessService.createVendor(vendor);
  }
}
