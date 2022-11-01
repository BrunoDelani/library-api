import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1667305510658 implements MigrationInterface {
  name = '$npmConfigName1667305510658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(30) NOT NULL, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`book\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(60) NOT NULL, \`resume\` varchar(500) NOT NULL, \`author\` varchar(60) NOT NULL, \`publisher\` varchar(60) NOT NULL, \`age_rating\` tinyint NOT NULL, \`year_publication\` year NOT NULL, \`pages\` smallint NOT NULL, \`stock\` smallint NOT NULL, \`value\` decimal(6,2) NOT NULL, \`image_path\` varchar(255) NULL, UNIQUE INDEX \`IDX_233978864a48c44d3fcafe0157\` (\`name\`), UNIQUE INDEX \`IDX_6aab7ef9cece55b895b74518d5\` (\`image_path\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`book_categories_category\` (\`bookId\` varchar(36) NOT NULL, \`categoryId\` varchar(36) NOT NULL, INDEX \`IDX_3f2c919594cd1b6386240d6d46\` (\`bookId\`), INDEX \`IDX_83b564c6e2518a2af3c60ac9da\` (\`categoryId\`), PRIMARY KEY (\`bookId\`, \`categoryId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_categories_category\` ADD CONSTRAINT \`FK_3f2c919594cd1b6386240d6d464\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_categories_category\` ADD CONSTRAINT \`FK_83b564c6e2518a2af3c60ac9da6\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book_categories_category\` DROP FOREIGN KEY \`FK_83b564c6e2518a2af3c60ac9da6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_categories_category\` DROP FOREIGN KEY \`FK_3f2c919594cd1b6386240d6d464\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_83b564c6e2518a2af3c60ac9da\` ON \`book_categories_category\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3f2c919594cd1b6386240d6d46\` ON \`book_categories_category\``,
    );
    await queryRunner.query(`DROP TABLE \`book_categories_category\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6aab7ef9cece55b895b74518d5\` ON \`book\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_233978864a48c44d3fcafe0157\` ON \`book\``,
    );
    await queryRunner.query(`DROP TABLE \`book\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
