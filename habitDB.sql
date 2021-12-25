CREATE TABLE "user" (
  "user_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "joinday" TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY ("user_id")
);

CREATE TABLE "myhabit" (
  "habit_id" SERIAL,
  "user_id" TEXT NOT NULL,
  "habit_title" TEXT NOT NULL,
  "habit_text" TEXT NOT NULL,
  "habit_week" INT NOT NULL,
  PRIMARY KEY ("habit_id"),
  CONSTRAINT "FK_myhabit.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("user_id")
);

CREATE TABLE "todolist" (
  "todo_id" SERIAL,
  "user_id" TEXT NOT NULL,
  "todo_date" DATE NOT NULL,
  "todo_title" TEXT NOT NULL,
  "todo_text" TEXT NOT NULL,
  PRIMARY KEY ("todo_id")
);

INSERT INTO "user" (
	user_id, name, password
) VALUES (
	'ccchhh1234',
	'차한울',
	'123456'
);
INSERT INTO "myhabit" (
	user_id, habit_title, habit_text, habit_week
) VALUES (
	'ccchhh1234',
	'오늘은꼭',
	'매주 이날은 8시에 드라마를 보는날입니다.',
  3
);
INSERT INTO "myhabit" (
	user_id, habit_title, habit_text, habit_week
) VALUES (
	'ccchhh1234',
	'운동하는날',
	'6시까지 센터로 달려가!',
  5
);
INSERT INTO "myhabit" (
	user_id, habit_title, habit_text, habit_week
) VALUES (
	'ccchhh1234',
	'알바하쟈',
	'취미라고 하긴 뭐한데 일단 일하는날이야',
  6
);

