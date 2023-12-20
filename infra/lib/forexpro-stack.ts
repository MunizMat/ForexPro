import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { AttributeType, ProjectionType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class ForexProStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const trades_queue = new Queue(this, 'TradesQueue', {
      visibilityTimeout: Duration.seconds(300),
      receiveMessageWaitTime: Duration.seconds(10),
      fifo: true,
      retentionPeriod: Duration.days(1),
      queueName: 'TradesQueue.fifo',
    });

    const user_trades_table = new Table(this, 'ForexPro-TradesUser', {
      partitionKey: {
        name: 'partition_key',
        type: AttributeType.STRING,
      },
      sortKey: { name: 'sort_key', type: AttributeType.STRING },
      tableName: 'ForexPro-TradesUser',
    });

    user_trades_table.addGlobalSecondaryIndex({
      indexName: 'email_index',
      partitionKey: {
        name: 'email',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    });
  }
}
