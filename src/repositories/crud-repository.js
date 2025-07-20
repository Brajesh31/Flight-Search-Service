const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");


class CrudRepository{
    constructor(model){
        this.model=model;
    }

    async create(data){
        try{
            const response= await this.model.create(data)
            return response
        }catch(error){
            console.log("Something went wrong in the CRUD repo : create")
            throw error
        }
    }

    async destroy(data){
        try{
            const response= await this.model.destroy({
                where:{
                    id:data
                }
            })
            if(!response){
                throw new AppError('Nothing to delete',StatusCodes.NOT_FOUND)            }
            return response
        }catch(error){
            console.log("Something went wrong in the CRUD repo : destroy")
            throw error
        }
    }

    async get(data){
        try{
            const response= await this.model.findByPk(data)
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return response
        }catch(error){
            console.log("Something went wrong in the CRUD repo : get")
            throw error
        }
    }

    async getAll(){
        try{
            const response= await this.model.findAll()
            return response
        }catch(error){
            console.log("Something went wrong in the CRUD repo : getAll")
            throw error
        }
    }

    async update(id,data){
        try{
            const response= await this.model.update(data,{
                where:{
                    id:id
                }
            })
            return response
        }catch(error){ 
            console.log("Something went wrong in the CRUD repo : update")
            throw error
        }
    }

}

module.exports = CrudRepository