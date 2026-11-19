CREATE TABLE public.sculptures (
                                   id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                   name text NOT NULL,
                                   artist text NOT NULL,
                                   description text NOT NULL,
                                   year integer NOT NULL,
                                   location text,
                                   url text NOT NULL,
                                   alt text NOT NULL
);