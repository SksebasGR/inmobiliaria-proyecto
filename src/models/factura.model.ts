import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Apartamento} from './apartamento.model';

@model()
export class Factura extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  valorAPagar: number;

  @property({
    type: 'string',
    required: true,
  })
  mes: string;

  @property({
    type: 'string',
    required: true,
  })
  ano: string;

  @property({
    type: 'string',
    required: true,
  })
  metodoPago: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasOne(() => Apartamento)
  apartamento: Apartamento;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
