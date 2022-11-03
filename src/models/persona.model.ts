import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Apartamento} from './apartamento.model';
import {Roles} from './roles.model';
import {Factura} from './factura.model';

@model()
export class Persona extends Entity {
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
  nombreCompleto: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  @hasOne(() => Roles)
  roles: Roles;

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
