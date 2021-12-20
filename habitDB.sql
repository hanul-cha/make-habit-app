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
  "habit_day" DATE NOT NULL,
  "habit_title" TEXT NOT NULL,
  "habit_text" TEXT NOT NULL,
  "habit_date" INT NOT NULL,
  "check_habit" BOOLEAN DEFAULT FALSE,
  PRIMARY KEY ("habit_id")
);

CREATE TABLE "todolist" (
  "todo_id" SERIAL,
  "user_id" TEXT NOT NULL,
  "todo_day" DATE NOT NULL,
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

