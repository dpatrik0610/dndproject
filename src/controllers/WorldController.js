class WorldController {
    constructor(worldService, playerService, logger, WorldModel) {
        this.worldService = worldService;
        this.logger = logger;
        this.WorldModel = WorldModel;
    }
    
    // World CRUD

    async getAll(req, res) {
        try {
            const worlds = await this.worldService.getAllWorlds();
            return res.status(200).json(worlds);
        } catch (error) {
            this.logger.error('Error fetching worlds:', error.message);
            return res.status(500).json({ message: 'Failed to fetch worlds' });
        }
    }

    async getById(req, res) {
        const { worldId } = req.params;

        try {
            const world = await this.worldService.getWorldById(worldId);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error fetching world with ID ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to fetch world' });
        }
    }

    async create(req, res) {
        try {
            const worldData = new this.WorldModel(req.body);
            const newWorld = await this.worldService.createWorld(worldData);

            return res.status(201).json(newWorld);
        } catch (error) {
            this.logger.error('Error creating world:', error.message);
            return res.status(500).json({ message: 'Failed to create world' });
        }
    }

    async update(req, res) {
        const { worldId } = req.params;

        try {
            const worldData = new this.WorldModel(req.body);
            const updatedWorld = await this.worldService.updateWorld(worldId, worldData);

            if (!updatedWorld) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(updatedWorld);
        } catch (error) {
            this.logger.error(`Error updating world with ID ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to update world' });
        }
    }

    async delete(req, res) {
        const { worldId } = req.params;

        try {
            const deleted = await this.worldService.deleteWorld(worldId);

            if (!deleted) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json({ message: 'World deleted successfully' });
        } catch (error) {
            this.logger.error(`Error deleting world with ID ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to delete world' });
        }
    }

    // Faction Management

    async addFaction(req, res) {
        const { worldId } = req.params;
        const { factionData } = req.body;

        try {
            const world = await this.worldService.addFactionToWorld(worldId, factionData);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error adding faction to world ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to add faction' });
        }
    }

    // Region Management

    async addRegion(req, res) {
        const { worldId } = req.params;
        const { regionData } = req.body;
        try {
            const world = await this.worldService.addRegionToWorld(worldId, regionData);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error adding region to world ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to add region' });
        }
    }

    async addGlobalItem(req, res) {
        const { worldId } = req.params;
        const { itemData } = req.body;
        try {
            const world = await this.worldService.addGlobalItemToWorld(worldId, itemData);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error adding global item to world ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to add global item' });
        }
    }

    // Economy Management

    async updateEconomy(req, res) {
        const { worldId } = req.params;
        const { newEconomyState } = req.body;
        try {
            const world = await this.worldService.updateEconomy(worldId, newEconomyState);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error updating economy state for world ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to update economy state' });
        }
    }

    // Event Management

    async addEvent(req, res) {
        const { worldId } = req.params;
        const { eventData } = req.body;
        try {
            const world = await this.worldService.addEventToWorld(worldId, eventData);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }

            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error adding event to world ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to add event' });
        }
    }

    // Player Management

    async addPlayer(req, res) {
        const { worldId } = req.params;
        const { playerId } = req.params;

        try {
            const player = await this.playerService.getPlayerOverview(playerId);
            if (!player) return res.status(404).json({ message: `Player not found: ${playerId}`});

            const world = await this.worldService.addPlayerToWorld(worldId, player);

            if (!world) {
                return res.status(404).json({ message: 'World not found' });
            }
            
            return res.status(200).json(world);
        } catch (error) {
            this.logger.error(`Error adding player to world ${worldId}:`, error.message);
            return res.status(500).json({ message: 'Failed to add player' });
        }
    }
    
    async removePlayer(req, res) {
        const { worldId } = req.params;
        const { playerId } = req.params;

        try {
            const world = await this.worldService.removePlayerFromWorld(worldId, playerId);

            if (!world) {
                return res.status(404).json({ message: 'World or Player not found.' });
            }

            return res.status(200).json({ message: "Player removed from world successfully."})
        } catch (error) {
            this.logger.error(`Error removing player (${playerId}) from world: ${worldId}`)
        }
    }

}

module.exports = WorldController;
