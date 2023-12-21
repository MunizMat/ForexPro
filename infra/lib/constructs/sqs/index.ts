/* ----------- External ------------ */
import { Duration } from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class ForexProQueue extends Construct {
  public readonly queue: Queue;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.queue = new Queue(this, 'TradesQueue', {
      visibilityTimeout: Duration.seconds(300),
      fifo: true,
      retentionPeriod: Duration.days(1),
      queueName: 'TradesQueue.fifo',
    });
  }
}
