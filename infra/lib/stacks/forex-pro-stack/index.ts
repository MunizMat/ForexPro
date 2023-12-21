/* ------------ External ----------- */
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/* ------------ Constructs ----------- */
import { ForexProQueue } from '../../constructs/sqs';
import { ForexProDynamoTable } from '../../constructs/dynamo';
import { ForexProSecret } from '../../constructs/secrets-manager';

/* ------------ Types ----------- */
import { CDK } from '../../../@types/cdk';

export class ForexProStack extends Stack {
  public readonly sqs_queue: ForexProQueue;
  public readonly dynamo_table: ForexProDynamoTable;
  public readonly secret: ForexProSecret;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const { dynamo_table_name, sqs_queue_name, secret_name }: CDK.Context =
      this.node.tryGetContext('ForexPro');

    /* ------------ Constructs ----------- */
    this.sqs_queue = new ForexProQueue(this, 'ForexProQueue', {
      sqs_queue_name,
    });

    this.dynamo_table = new ForexProDynamoTable(this, 'ForexProDynamoTable', {
      dynamo_table_name,
    });

    this.secret = new ForexProSecret(this, 'ForexProSecret', {
      secret_name,
    });
  }
}
