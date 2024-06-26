import 'dotenv/config';

import {
    UnauthorizedError
} from '../errors/index.js';

export const ApiKeyVerifier = async (req, res, next) => {
    const apiKey = req.headers.apikey ? req.headers.apikey : false;

    if(!apiKey) {
        const error = new UnauthorizedError()
        return res.status(error.code).json({ error });
    }

    if(apiKey !== process.env.API_KEY) {
        const error = new UnauthorizedError()
        return res.status(error.code).json({ error });
    }

    return next();
}