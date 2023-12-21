/* ------------ External -------------- */
import {
  AttributeType,
  GlobalSecondaryIndexProps,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class ForexProDynamoTable extends Construct {
  public readonly table: Table;
  public readonly global_secondary_indexes: GlobalSecondaryIndexProps[];

  constructor(scope: Construct, id: string) {
    super(scope, id);

    /* ----------- Dynamo Table ------------ */
    this.table = new Table(this, 'ForexPro-TradesUser', {
      partitionKey: {
        name: 'partition_key',
        type: AttributeType.STRING,
      },
      sortKey: { name: 'sort_key', type: AttributeType.STRING },
      tableName: 'ForexPro-TradesUser',
    });

    /* ----------- GSI's ------------ */
    this.global_secondary_indexes = [
      {
        indexName: 'email_index',
        partitionKey: {
          name: 'email',
          type: AttributeType.STRING,
        },
        projectionType: ProjectionType.ALL,
      },
    ];

    this.global_secondary_indexes.forEach((gsi) =>
      this.table.addGlobalSecondaryIndex(gsi),
    );
  }
}
