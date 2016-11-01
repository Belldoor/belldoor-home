/**
 * Created by Jong-Moon on 2016-11-01.
 */
var os = require('os');

exports.status = function (callback) {
    function getResources(next) {
        var resStatus = {
            cpu: 0, mem: 0,
            tempAvg: {
                cpu: {total: 0, idle: 0},
                mem: {total: os.totalmem(), idle: os.freemem()}
            }
        };
        var cpusage = os.cpus();
        cpusage.map(function (d) {
            resStatus.tempAvg.cpu.total += d.times.user + d.times.sys + d.times.irq + d.times.nice + d.times.idle;
            resStatus.tempAvg.cpu.idle += d.times.idle;
        });
        return next(resStatus);
    }

    function aggregateRate(status) {
        var temps = Object.keys(status.tempAvg);
        temps.forEach(function (temp) {
            status[temp] = parseFloat((1 - status.tempAvg[temp].idle / status.tempAvg[temp].total).toFixed(4));
        });
        return status;
    }

    // TODO: collect status every 30mins.
    // TODO: time, rates, ...

    getResources(function (status) {
        return callback(null, aggregateRate(status));
    });
};