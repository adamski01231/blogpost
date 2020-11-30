import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVotes1606767824944 implements MigrationInterface {
    name = 'AddVotes1606767824944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("post_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_15600df41b6039e5e222592eaef" PRIMARY KEY ("post_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_18499a5b9b4cf71093f7b7f79f8" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_27be2cab62274f6876ad6a31641"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_18499a5b9b4cf71093f7b7f79f8"`);
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}
