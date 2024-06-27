import LogsRepository from '../repository/LogsRepository.js';

const logsRepository = new LogsRepository();

class LogsController {

    // READ

    async getLogs(req, res) {
        const { 
            search = null, 
            page = 0, 
            size = 10,
            sortKey = 'createdAt',
            sortDirection = 'ASC'
        } = req.query;

        const params = {
            sortKey,
            sortDirection,
            page,
            size
        };

        const data = await logsRepository.getLogs(params);
        
        res.send(data);
    }

    async getLogById(req, res) {
        const { id } = req.params;
        const data = await logsRepository.getLogById(id);

        res.send(data);
    }

    async getWateringLogs(req, res) {
        const { 
            search = null, 
            page = 0, 
            size = 10,
            sortKey = 'createdAt',
            sortDirection = 'ASC'
        } = req.query;

        const params = {
            sortKey,
            sortDirection,
            page,
            size
        };

        const data = await logsRepository.getWateringLogs(params);

        res.send(data);
    }

    // DELETE

    async deleteLogById(req, res) {
        const { id } = req.params;
        const data = await logsRepository.deleteLogById(id);

        res.send(data);
    }
}

export default LogsController;