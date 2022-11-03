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
  Factura,
  Apartamento,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaApartamentoController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Factura has one Apartamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Apartamento),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Apartamento>,
  ): Promise<Apartamento> {
    return this.facturaRepository.apartamento(id).get(filter);
  }

  @post('/facturas/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamentoInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) apartamento: Omit<Apartamento, 'id'>,
  ): Promise<Apartamento> {
    return this.facturaRepository.apartamento(id).create(apartamento);
  }

  @patch('/facturas/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Factura.Apartamento PATCH success count',
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
    return this.facturaRepository.apartamento(id).patch(apartamento, where);
  }

  @del('/facturas/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Factura.Apartamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.facturaRepository.apartamento(id).delete(where);
  }
}
