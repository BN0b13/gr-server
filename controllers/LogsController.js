import LogsRepository from '../repository/LogsRepository.js';

const logsRepository = new LogsRepository();

class LogsController {

    // READ

    async getLogs(req, res) {
        const data = await logsRepository.getLogs();

        res.send(data);
    }

    async getLogById(req, res) {
        const { id } = req.params;
        const data = await logsRepository.getLogById(id);

        res.send(data);
    }

    async getWateringLogs(req, res) {
        const data = await logsRepository.getWateringLogs();

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