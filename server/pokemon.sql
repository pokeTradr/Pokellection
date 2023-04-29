SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = ‘UTF8’;
SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config(‘search_path’, ‘’, false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP TABLE IF EXISTS pokemonTable;


CREATE TABLE public.pokemonTable (
  pokemon_name varchar,
  pokemon_type varchar,
  hp bigInt default -1,
  marketPrice numeric default -1,
  updatedDate varchar,
  img varchar
);

--INSERT INTO pokemonTable (pokemon_name, pokemon_type, hp, marketPrice, updatedDate) VALUES ( 'pikachu', 'fire', 6, 5, '1/2/2020');
