# dndproject

A Node.js project for managing and interacting with Dungeons & Dragons 5e data. The project integrates with the [Dungeons & Dragons 5e API](https://www.dnd5eapi.co/) (Huge thanks for the easy-to-use API ^~^) and also includes custom functionality for managing spells, monsters, races, classes, and other D&D entities. It provides a set of utility functions and API interaction methods to streamline game mechanics management.

## Features
- **API Integration**: Fetch data from the D&D 5e API for entities like spells, classes, races, monsters, and more.
- **Custom Functions**: Includes custom logic and functions tailored for specific use cases beyond just interacting with the API.
- **Caching**: Automatic caching of API responses to improve performance and reduce redundant requests.

## TODO Features:
- Custom Spell Generator
- Custom Item Generator
- Helping functions for Dungeon Master's
- Frontend page

## Installation
1. Clone the repository: 
```bash
git clone https://github.com/dpatrik0610/dndproject.git
```
2. Install dependencies (Used dependencies could be found in: ``package.json``)
```bash
cd .\dndproject\src\
npm install
```
3. Set up the environment variable for the D&D 5e API URL:
    Create a .env file at the root of the project and add:
```plaintext
MONGO_URI=[YOUR MONGO URI]
DB_NAME=[YOUR DATABASE NAME]
PORT=[CUSTOM PORT]
DND_5E_URL=https://www.dnd5eapi.co
```

```plaintext
├── src/
│   ├── config/                # Configuration files (database connection)
│   ├── controllers/           # Controllers to handle requests
│   ├── models/                # Database models (MongoDB schemas)
│   ├── repositories/          # Data access layer for MongoDB
│   ├── services/              # Business logic layer
│   ├── routes/                # Route definitions
│   ├── middlewares/           # Express middleware
│   ├── utils/                 # Utility functions
│   └── index.js               # Entry point
```
