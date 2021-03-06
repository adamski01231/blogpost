import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPosts1606663893845 implements MigrationInterface {
    name = 'AddPosts1606663893845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
