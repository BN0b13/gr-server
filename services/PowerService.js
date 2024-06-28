import { Gpio } from 'onoff';
import LogsRepository from '../repository/LogsRepository.js';

const PowerOutlet = new Gpio(533, 'out');
const logsRepository = new LogsRepository;

class PowerService {

    async outletStatus() {
        const outletStatus = await PowerOutlet.read();
        return {
            outletStatus,
            message: `Outlet is currently ${outletStatus === 1 ? 'on' : 'off'}`,
            status: 200
        };
    }

    async cycleOutletOnOff(time = 10000) {
        const message = `Pumps will cycle for ${time/1000} seconds`;
        console.log(message);
        PowerOutlet.writeSync(1);

        setTimeout(() => {
            console.log('Shutting down pumps...');
            PowerOutlet.writeSync(0);
        }, time);

        const data = {
            type: 'watering cycle',
            location: 'grow room 1',
            duration: `${time/1000} seconds`,
            time,
            notes: {
                ph: '',
                ppm: '',
                temperature: ''
            }
        }

        const res = await logsRepository.createLog(data);

        return {
            message,
            status: 200,
            res
        }
    }
}

export default PowerService;