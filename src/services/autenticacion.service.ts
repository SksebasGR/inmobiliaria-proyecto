import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import generador from 'password-generator';
import {llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository
  ) {}

  validarAcceso(user : string, password : string  ){
    try{
      //validamos los datos de la tabla persona
      const persona = this.personaRepository.findOne({
        where: {
          correo: user,
          clave: password
        }
      });
      if(persona)
        return persona;
      return false;

    }catch(error){
      return false;
    }
  }

  generarClave = () => generador(8, false);

  cifrarClave = (clave:string) => cryptoJS.MD5(clave).toString();

  generarTokenJWT(persona: Persona){
    const token = jwt.sign({
      data:{
        id: persona.id,
        correo: persona.correo,
        nombre: persona.nombreCompleto
      }
    }, llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token: string){
    try{
      const datos = jwt.verify(token, llaves.claveJWT);
      console.log(datos);

      return datos;
    } catch(error){
      return false;
    }
  }
}
