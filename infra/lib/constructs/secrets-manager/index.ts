/* ---------- External ---------- */
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

/* ---------- Utils ---------- */
import { get_secrets } from './utils/get_secrets';

/* ---------- Interfaces ---------- */
interface Props {
  secret_name: string;
}

export class ForexProSecret extends Construct {
  public readonly secret: Secret;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { secret_name } = props;
    this.secret = new Secret(this, 'ForexProSecret', {
      secretName: secret_name,
      secretObjectValue: get_secrets(),
    });
  }
}
