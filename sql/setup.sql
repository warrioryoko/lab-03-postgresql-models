DROP TABLE IF EXISTS planeswalkers;
DROP TABLE IF EXISTS reading_list;
DROP TABLE IF EXISTS superheroes;
DROP TABLE IF EXISTS bond_cars;
DROP TABLE IF EXISTS pokemon;

CREATE TABLE planeswalkers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    walker_name TEXT NOT NULL,
    birthplace TEXT NOT NULL,
    color TEXT NOT NULL,
    lifespan INT NOT NULL
);

CREATE TABLE reading_list (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL,
    publish_date INT NOT NULL
);

CREATE TABLE superheroes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hero_name TEXT NOT NULL,
    alter_ego TEXT NOT NULL,
    occupation TEXT NOT NULL,
    publisher TEXT NOT NULL,
);

CREATE TABLE bond_cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    manufacturer TEXT NOT NULL,
    doors INT NOT NULL,
    class TEXT NOT NULL,
    engine TEXT NOT NULL,
    horsepower_max INT NOT NULL
);

CREATE TABLE pokemon (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pokemon_name TEXT NOT NULL,
    pokemon_type TEXT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    speed INT NOT NULL 
);