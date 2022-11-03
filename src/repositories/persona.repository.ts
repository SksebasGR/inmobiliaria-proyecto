import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Apartamento, Roles, Factura} from '../models';
import {ApartamentoRepository} from './apartamento.repository';
import {RolesRepository} from './roles.repository';
import {FacturaRepository} from './factura.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Persona.prototype.id>;

  public readonly roles: HasOneRepositoryFactory<Roles, typeof Persona.prototype.id>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Persona, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.roles = this.createHasOneRepositoryFactoryFor('roles', rolesRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
  }
}
