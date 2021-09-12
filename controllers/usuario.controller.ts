import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async ( req: Request , res: Response) => {
    
    const usuarios = await Usuario.findAll();

    res.status(200).json({
        'msg': 'Get | usuarios',
        usuarios
    });
}

export const getUsuario = async ( req: Request , res: Response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if( !usuario ){
        res.status(404).json({
            error_msg: 'El usuario no existe con ese id'
        });
    }
    else{
        res.status(200).json({
            'msg': 'Get | usuario by id',
            id,
            usuario
        });
    }
    
}

export const postUsuario = async ( req: Request , res: Response) => {
    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                'error_msg': 'Error, este correo ya ha sido registrado'
            });
        }

        const nuevo = new Usuario(body);
        await nuevo.save();


        res.status(200).json({
            'msg': 'POST | usuario',
            body,
            nuevo,
        });
    } catch (error) {
        res.status(500).json({
            'error_msg': 'Ocurrió un error inesperado: ' + error
        });
    }
    
}


export const putUsuario = async ( req: Request , res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk( id );
        if(!usuario){
            return res.status(400).json({
                'error_msg': 'Error, el usuario no existe'
            });
        }

        await usuario.update(body);

        res.status(200).json({
            'msg': 'PUT | usuario actualizado',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            'error_msg': 'Ocurrió un error inesperado: ' + error
        });
    }
}

export const deleteUsuario = async ( req: Request , res: Response) => {
    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk( id );
        if(!usuario){
            return res.status(400).json({
                'error_msg': 'Error, el usuario no existe'
            });
        }

        await usuario.update({
            status: false
        })

        res.status(200).json({
            'msg': 'DELETE | usuario eliminado',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            'error_msg': 'Ocurrió un error inesperado: ' + error
        });
    }
}


