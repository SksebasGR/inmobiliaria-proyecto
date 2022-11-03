import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Persona,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaPersonaController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Persona> {
    return this.facturaRepository.persona(id);
  }
}
