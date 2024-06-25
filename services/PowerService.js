import { Gpio } from 'onoff';

// const PowerOutlet = new Gpio(21, 'out');

class PowerService {

    async cycleDownstairsPumps(time) {
        console.log('Turning on pumps...');
        // PowerOutlet.writeSync(1);

        setTimeout(() => {
            console.log('Shutting down pumps...');
            // PowerOutlet.writeSync(0);
        }, time);

        return {
            message: `Pumps will cycle for ${time/100} seconds`
        }
    }
}

export default PowerService;