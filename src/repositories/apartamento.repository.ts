import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Apartamento, ApartamentoRelations, Persona, Torre} from '../models';
import {PersonaRepository} from './persona.repository';
import {TorreRepository} from './torre.repository';

export class ApartamentoRepository extends DefaultCrudRepository<
  Apartamento,
  typeof Apartamento.prototype.id,
  ApartamentoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Apartamento.prototype.id>;

  public readonly torre: BelongsToAccessor<Torre, typeof Apartamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>,
  ) {
    super(Apartamento, dataSource);
    this.torre = this.createBelongsToAccessorFor('torre', torreRepositoryGetter,);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
