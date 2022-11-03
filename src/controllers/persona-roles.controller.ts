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
  Roles,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaRolesController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/roles', {
    responses: {
      '200': {
        description: 'Persona has one Roles',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roles),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles> {
    return this.personaRepository.roles(id).get(filter);
  }

  @post('/personas/{id}/roles', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.personaRepository.roles(id).create(roles);
  }

  @patch('/personas/{id}/roles', {
    responses: {
      '200': {
        description: 'Persona.Roles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.personaRepository.roles(id).patch(roles, where);
  }

  @del('/personas/{id}/roles', {
    responses: {
      '200': {
        description: 'Persona.Roles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.personaRepository.roles(id).delete(where);
  }
}
