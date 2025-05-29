import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Order } from 'prisma/generated/prisma-client';

type BullMQEvent<T = undefined> = {
  jobId: string;
  returnvalue: T;
  previous: string;
  failedReason?: string;
};

@QueueEventsListener('orders')
export class OrdersQueueEventsListener extends QueueEventsHost {
  private readonly logger = new Logger(OrdersQueueEventsListener.name);

  @OnQueueEvent('active')
  onActive(job: BullMQEvent) {
    this.logger.log(
      `Job ${job.jobId} is now active. Previous state: ${job.previous}`,
    );
  }

  @OnQueueEvent('completed')
  onCompleted(job: BullMQEvent<Order>) {
    this.logger.log(
      `Job ${job.jobId} completed with result: ${JSON.stringify(job.returnvalue)}`,
    );
  }

  @OnQueueEvent('progress')
  onProgress(job: BullMQEvent) {
    this.logger.log(`Job ${job.jobId} progress: ${job.returnvalue}%`);
  }

  @OnQueueEvent('failed')
  onFailed(job: BullMQEvent) {
    this.logger.error(
      `Job ${job.jobId} failed with error: ${job.failedReason}`,
    );
  }
}
