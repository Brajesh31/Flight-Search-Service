class AppError extends Error {
    constructor(message,statusCode){
      super(message)
      this.statusCode=statusCode
      this.explaination=message
    }
}

module.exports =AppError