import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Apartamento,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaApartamentoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Apartamento>,
  ): Promise<Apartamento[]> {
    return this.personaRepository.apartamentos(id).find(filter);
  }

  @post('/personas/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamentoInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) apartamento: Omit<Apartamento, 'id'>,
  ): Promise<Apartamento> {
    return this.personaRepository.apartamentos(id).create(apartamento);
  }

  @patch('/personas/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Persona.Apartamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {partial: true}),
        },
      },
    })
    apartamento: Partial<Apartamento>,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.personaRepository.apartamentos(id).patch(apartamento, where);
  }

  @del('/personas/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Persona.Apartamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.personaRepository.apartamentos(id).delete(where);
  }
}
