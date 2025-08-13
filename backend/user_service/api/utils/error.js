import { S3ServiceException } from "@aws-sdk/client-s3";

export class ErrorBadRequest extends Error {
	constructor(message) {
		super(message);
		this.name = 'BadRequestError';
		this.statusCode = 400;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ErrorUnAuthorized extends Error {
	constructor(message) {
		super(message);
		this.name = 'UnAuthorizedError';
		this.statusCode = 401;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ErrorForbidden extends Error {
	constructor(message) {
		super(message);
		this.name = 'ForbiddenError';
		this.statusCode = 403;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ErrorNotFound extends Error {
	constructor(message) {
		super(message);
		this.name = 'NotFoundError';
		this.statusCode = 404;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ErrorConflict extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConflictError';
		this.statusCode = 409;
		Error.captureStackTrace(this, this.constructor);
	}
}
export class ErrorInternalServer extends Error {
	constructor(message) {
		super(message);
		this.name = 'InternalServerError';
		this.statusCode = 500;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ErrorBadGateway extends Error {
	constructor(message) {
		super(message);
		this.name = 'BadGateway';
		this.statusCode = 502;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ErrorCustom extends Error {
	constructor(message, code) {
		super(message);
		this.name = 'CustomError';
		this.statusCode = code;
		Error.captureStackTrace(this, this.constructor);
	}
}

export function handleError(err, reply, defaultMessage) {
	if (err instanceof ErrorNotFound || 
		err instanceof ErrorBadRequest || 
		err instanceof ErrorConflict || 
		err instanceof ErrorUnAuthorized ||
		err instanceof ErrorBadGateway ||
		err instanceof ErrorCustom ||
		err instanceof ErrorForbidden ||
		err instanceof S3ServiceException) {
	  return reply.code(err.statusCode).send({ message: err.message });
	}
	
	return reply.code(500).send({ message: defaultMessage });
}