import { Gpio } from 'onoff';

const PowerOutlet = new Gpio(533, 'out');

class PowerService {

    async outletStatus() {
        const outletStatus = await PowerOutlet.read();
        return {
            outletStatus,
            message: `Outlet is currently ${outletStatus === 1 ? 'on' : 'off'}`,
            status: 200
        };
    }

    async cycleOutletOnOff(time) {
        const message = `Pumps will cycle for ${time/1000} seconds`;
        console.log(message);
        PowerOutlet.writeSync(1);

        setTimeout(() => {
            console.log('Shutting down pumps...');
            PowerOutlet.writeSync(0);
        }, time);

        return {
            message,
            status: 200
        }
    }
}

export default PowerService;