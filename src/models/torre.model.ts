import {Entity, model, property, hasMany} from '@loopback/repository';
import {Apartamento} from './apartamento.model';

@model()
export class Torre extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;
