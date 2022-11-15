import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy{
  name = 'admin';

  constructor(
    @service(AutenticacionService)
    public autenticacionservice : AutenticacionService
  ){}



  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    const token = parseBearerToken(request);
    if(token){
      const datos = this.autenticacionservice.validarTokenJWT(token);
      if(datos){
        const perfil:UserProfile=Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      } else{
        throw new HttpErrors[401]('Token invalido');
      }
    } else{
      throw new HttpErrors[403]('No tiene permisos par acceder a este servicio')
    }

  }

}
