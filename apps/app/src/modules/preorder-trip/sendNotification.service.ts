import { Injectable } from '@nestjs/common';
import { SchedulerRegistry} from '@nestjs/schedule';
import {CronJob} from "cron";

@Injectable()
export default class SendNotificationService {
  constructor(private schedulerRegistry: SchedulerRegistry){}



  addCronJob(name: string, time: Date) {
    // TODO make socket notify client
    // Figure out how to add multiple cron for one user..
    const when = new Date(new Date(time).getTime() - 2.5 * 60 * 60 * 1000);
    const job = new CronJob(when, () => {
      console.log(when, 'WHen')
      console.log(new Date(Date.now()), 'NOW')
      console.log('Cron is working')
      console.log('😁😁😁😁😁😁😁😁😁😁')
      this.schedulerRegistry.deleteCronJob(name)
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

  }

}
