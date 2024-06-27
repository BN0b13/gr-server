import { Logs } from '../models/Associations.js';

class LogsRepository {

    // READ

    async getLogs() {
        try {
            const res = await Logs.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Logs Error: ', err);
            throw Error('There was an error getting the logs');
        }
    }

    async getLogById(id) {
        try {
            const res = await Logs.findAndCountAll({
                where: {
                    id
                }
            });
            return res;
        } catch (err) {
            console.log('Get Log By ID Error: ', err);
            throw Error('There was an error getting the log by id');
        }
    }

    async getWateringLogs() {
        try {
            const res = await Logs.findAndCountAll({
                where: {
                    type: 'watering cycle'
                }
            });
            return res;
        } catch (err) {
            console.log('Get Watering Logs Error: ', err);
            throw Error('There was an error getting the watering logs');
        }
    }

    // CREATE

    async createLog(data) {
        try {
            const res = await Logs.create(data);
            return res;
        } catch (err) {
            console.log('CREATE Log Error: ', err);
            throw Error('There was an error creating the log');
        }
    }

    // DELETE

    async deleteLogById(id) {
        try {
            const res = await Logs.destroy({
                where: {
                    id
                }
            });
            return {
                deleteRes: res,
                status: 200
            };
        } catch (err) {
            console.log('DELETE Log Error: ', err);
            throw Error('There was an error deleting the log');
        }
    }
}

export default LogsRepository;