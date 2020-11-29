import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPostTitle1606673351357 implements MigrationInterface {
    name = 'AddPostTitle1606673351357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
    }

}
