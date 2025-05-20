import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandeProduitService } from './commande-produit.service';
import { CreateCommandeProduitDto } from './dto/create-commande-produit.dto';
import { UpdateCommandeProduitDto } from './dto/update-commande-produit.dto';

@Controller('commande-produit')
export class CommandeProduitController {
  constructor(private readonly commandeProduitService: CommandeProduitService) {}

  @Post()
  create(@Body() createCommandeProduitDto: CreateCommandeProduitDto) {
    return this.commandeProduitService.create(createCommandeProduitDto);
  }

  @Get()
  findAll() {
    return this.commandeProduitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeProduitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeProduitDto: UpdateCommandeProduitDto) {
    return this.commandeProduitService.update(+id, updateCommandeProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeProduitService.remove(+id);
  }
}
