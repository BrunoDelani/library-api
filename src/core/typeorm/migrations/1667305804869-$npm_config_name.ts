import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1667305804869 implements MigrationInterface {
  name = '$npmConfigName1667305804869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_6aab7ef9cece55b895b74518d5\` ON \`book\``,
    );
    await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`image_path\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book\` ADD \`image_path\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_6aab7ef9cece55b895b74518d5\` ON \`book\` (\`image_path\`)`,
    );
  }
}
