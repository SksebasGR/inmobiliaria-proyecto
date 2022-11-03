import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Persona, Apartamento} from '../models';
import {PersonaRepository} from './persona.repository';
import {ApartamentoRepository} from './apartamento.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Factura.prototype.id>;

  public readonly apartamento: HasOneRepositoryFactory<Apartamento, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Factura, dataSource);
    this.apartamento = this.createHasOneRepositoryFactoryFor('apartamento', apartamentoRepositoryGetter);
    this.registerInclusionResolver('apartamento', this.apartamento.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
