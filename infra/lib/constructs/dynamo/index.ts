/* ------------ External -------------- */
import {
  AttributeType,
  GlobalSecondaryIndexProps,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

/* ------------ Interfaces -------------- */
interface Props {
  dynamo_table_name: string;
}

export class ForexProDynamoTable extends Construct {
  public readonly table: Table;
  public readonly global_secondary_indexes: GlobalSecondaryIndexProps[];

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { dynamo_table_name } = props;

    /* ----------- Dynamo Table ------------ */
    this.table = new Table(this, 'ForexPro-TradesUser', {
      partitionKey: {
        name: 'partition_key',
        type: AttributeType.STRING,
      },
      sortKey: { name: 'sort_key', type: AttributeType.STRING },
      tableName: dynamo_table_name,
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
