import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Torre} from './torre.model';

@model()
export class Apartamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  area: string;

  @property({
    type: 'string',
    required: true,
  })
  propeitario: string;

  @property({
    type: 'string',
    required: true,
  })
  habitante: string;

  @property({
    type: 'string',
    required: true,
  })
  imagenApartamento: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Torre)
  torreId: string;

  @property({
    type: 'string',
  })
  facturaId?: string;

  constructor(data?: Partial<Apartamento>) {
    super(data);
  }
}

export interface ApartamentoRelations {
  // describe navigational properties here
}

export type ApartamentoWithRelations = Apartamento & ApartamentoRelations;
