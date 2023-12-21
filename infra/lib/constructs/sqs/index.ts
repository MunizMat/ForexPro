/* ----------- External ------------ */
import { Duration } from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

/* ----------- Interfaces ------------ */
interface Props {
  sqs_queue_name: string;
}

export class ForexProQueue extends Construct {
  public readonly queue: Queue;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { sqs_queue_name } = props;

    this.queue = new Queue(this, 'TradesQueue', {
      visibilityTimeout: Duration.seconds(300),
      fifo: true,
      retentionPeriod: Duration.days(1),
      queueName: sqs_queue_name,
    });
  }
}
