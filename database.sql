CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"gender" VARCHAR (100) NOT NULL,
	"age" INTEGER,
  	"ready_to_transfer" BOOLEAN DEFAULT FALSE,
  	"notes" VARCHAR(9000)
);

INSERT INTO "koalas"
 	("name", "gender", "age", "ready_to_transfer", "notes")
VALUES 
('Scotty','M','4',TRUE,'Born in Guatemala'),
('Jean','F','5',TRUE,'Allergic to lots of lava'),
('Ororo','F','7', FALSE,'Loves listening to Paula (Abdul)'),
('K''Leaf','NB','15',FALSE,'Never refuses a treat.'),
('Charlie', 'M', '9', TRUE, 'Favorite band is Nirvana'),
('Betsy', 'F', '4',	TRUE, 'Has a pet iguana');