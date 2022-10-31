import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1666977447048 implements MigrationInterface {
  name = '$npmConfigName1666977447048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book\` ADD UNIQUE INDEX \`IDX_233978864a48c44d3fcafe0157\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book\` ADD UNIQUE INDEX \`IDX_6aab7ef9cece55b895b74518d5\` (\`image_path\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book\` DROP INDEX \`IDX_6aab7ef9cece55b895b74518d5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`book\` DROP INDEX \`IDX_233978864a48c44d3fcafe0157\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP INDEX \`IDX_23c05c292c439d77b0de816b50\``,
    );
  }
}
