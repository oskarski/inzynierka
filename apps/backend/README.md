## Installation

```bash
$ yarn install

$ cp .env.sample .env.development
# Set proper values in '.env.development'

$ yarn migration:run
```

## Development
```bash
$ yarn dev
```

## Migrations
```bash
# Generate new migration based on changes in code
$ yarn migration:generate src/migrations/NameOfTheMigration

# Apply pending migrations
$ yarn migration:run

# Revert last migration
$ yarn migration:revert
```

## Build
```bash
$ yarn build
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e
```
