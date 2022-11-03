import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Apartamento,
  Persona,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoPersonaController {
  constructor(
    @repository(ApartamentoRepository)
    public apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
  ): Promise<Persona> {
    return this.apartamentoRepository.persona(id);
  }
}
