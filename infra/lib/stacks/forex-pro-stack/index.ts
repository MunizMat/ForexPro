/* ------------ External ----------- */
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/* ------------ Constructs ----------- */
import { ForexProQueue } from '../../constructs/sqs';
import { ForexProDynamoTable } from '../../constructs/dynamo';

export class ForexProStack extends Stack {
  public readonly sqs_queue: ForexProQueue;
  public readonly dynamo_table: ForexProDynamoTable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /* ------------ Constructs ----------- */
    this.sqs_queue = new ForexProQueue(this, 'ForexProQueue');
    this.dynamo_table = new ForexProDynamoTable(this, 'ForexProDynamoTable');
  }
}
