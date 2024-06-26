import PowerService from "../services/PowerService.js";

const powerService = new PowerService();

class PowerController {

    // READ
    
    async health(req, res) {
        const data = {
            message: 'GR Server alive and well',
            status: 200
        };

        res.send(data);
    }

    async outletStatus(req, res) {
        const data = await powerService.outletStatus();
        res.send(data);
    }

    async cycleOutletOnOff(req, res) {
        console.log('Cycle Pumps initiated...');
        const {
            time = 10000
        } = req.query;

        const data = await powerService.cycleOutletOnOff(time);

        res.send(data);
    }
}

export default PowerController;