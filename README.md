# Breeds list

POC for a TS study, the back-end searches, creates, updates, and deletes contents on breeds table from Rin20 system

## How to run for development

1. clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with 'rintwenty' name
4. Create a database table with 'breeds' name using the format below

```psql
CREATE TABLE breeds (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    cientific TEXT NOT NULL,
    description TEXT NOT NULL,
    atk INTEGER DEFAULT(100),
    def INTEGER DEFAULT(100)
);
```

5. Create a database table with 'hab_breeds' name using the format below

```psql
CREATE TABLE hab_breeds (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER REFERENCES "breeds"("id") NOT NULL,
    habilities TEXT NOT NULL    
);
```

6. Configure the `.env` file using the `.env.example` file
7. Run the back-end in a development environment:

```bash
npm run dev
```

## populating the tables

### GET route
`/breeds`

It return a object in format

```
[
    {
        id: 1,
        name: "Lobisomen",
        cientific: "LiaCan",
        description: "Borned when exploxion from big three happend...",
        habilities: [
            "partial tranform", "complete transform", "alpha's cry", ...
        ]
        atk: 1569,
        def: 900
    },
    {
        id: 2,
        name: "Draconiano",
        cientific: "Draqueo",
        description: "Borned when exploxion from big three happend...",
        habilities: [
            "partial tranform", "complete transform", "alpha's cry", ...
        ]
        atk: 1013,
        def: 1987
    }
]
```

### POST route
`/breed`

Send in the format bellow

```
const newBreed = {
    name: "",
    cientific: "",
    description: "",
    habilities: [
        "", "", "", ...
    ]
    atk: 00,
    def: 00
}
```

It return with message `breed created successfully`

### DELETE route
`/breed/:id`
where `:id` is the breed id you want delete

It return with message `breed deleted successfully`

### UPDATE route
`/breed/:id`
where `:id` is the breed you want update

Send in the format bellow

```
const updateBreed = {
    name: "",
    cientific: "",
    description: "",
    habilities: [
        "", "", "", ...
    ]
    atk: 00,
    def: 00
}
```
where the content you want not update, you don't have to send

It return with message `breed updated successfully`