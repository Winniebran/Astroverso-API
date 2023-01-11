import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllEntities1673446927486 implements MigrationInterface {
    name = 'createAllEntities1673446927486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answer" character varying(250) NOT NULL, "point" integer NOT NULL DEFAULT '0', "isCorrect" boolean NOT NULL DEFAULT false, "questionsId" uuid, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying(150) NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes_questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quizzesId" uuid, "questionsId" uuid, CONSTRAINT "PK_95355468d0853bfecdbdfb961b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "usersId" uuid, CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "score" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usersId" uuid, "postsId" uuid, CONSTRAINT "PK_fb48e97e1b677f00b891c97b154" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(5000) NOT NULL, "astrosId" uuid, "categoriesId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "astros" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "image" character varying(400) NOT NULL, CONSTRAINT "PK_660f66eb79bc574ad4bb141838e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "extras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying(400) NOT NULL, "author" character varying(100) NOT NULL, "title" character varying(150) NOT NULL, "description" character varying(2000) NOT NULL, "link" character varying(400) NOT NULL, "typesId" uuid, CONSTRAINT "PK_e07ed57e910c6cfc15f350141a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_c56c77ccf310a9ff4e40e9facb2" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes_questions" ADD CONSTRAINT "FK_d6a4e862627ac67efa069c72680" FOREIGN KEY ("quizzesId") REFERENCES "quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes_questions" ADD CONSTRAINT "FK_19abcc8daa2d3a508947f5539db" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_8abd1a14cb31ed651ab3e458d9e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_posts" ADD CONSTRAINT "FK_87f9af3cce1b0aa4393dfb10e59" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_posts" ADD CONSTRAINT "FK_66b11a8522b91503fb0642b3be4" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_4c436d3f2f1dfa077b56348f8b1" FOREIGN KEY ("astrosId") REFERENCES "astros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_d65659eb59313689a8a3a1e0513" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "extras" ADD CONSTRAINT "FK_0602d06c1c6f1c65d8de1a4eeeb" FOREIGN KEY ("typesId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extras" DROP CONSTRAINT "FK_0602d06c1c6f1c65d8de1a4eeeb"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_d65659eb59313689a8a3a1e0513"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_4c436d3f2f1dfa077b56348f8b1"`);
        await queryRunner.query(`ALTER TABLE "favorite_posts" DROP CONSTRAINT "FK_66b11a8522b91503fb0642b3be4"`);
        await queryRunner.query(`ALTER TABLE "favorite_posts" DROP CONSTRAINT "FK_87f9af3cce1b0aa4393dfb10e59"`);
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_8abd1a14cb31ed651ab3e458d9e"`);
        await queryRunner.query(`ALTER TABLE "quizzes_questions" DROP CONSTRAINT "FK_19abcc8daa2d3a508947f5539db"`);
        await queryRunner.query(`ALTER TABLE "quizzes_questions" DROP CONSTRAINT "FK_d6a4e862627ac67efa069c72680"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_c56c77ccf310a9ff4e40e9facb2"`);
        await queryRunner.query(`DROP TABLE "extras"`);
        await queryRunner.query(`DROP TABLE "types"`);
        await queryRunner.query(`DROP TABLE "astros"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "favorite_posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quizzes_questions"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "options"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
