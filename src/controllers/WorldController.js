class WorldController {
    constructor(worldService, playerService, logger, WorldModel) {
        this.worldService = worldService;
        this.playerService = playerService;
        this.logger = logger;
        this.WorldModel = WorldModel;
    }
    
    // World CRUD

    async getAll(req, res) {
        try {
            const worlds = await this.worldService.getAllWorlds();
            return res.status(200).json({
                status: 'success',
                message: 'Worlds fetched successfully',
                data: worlds,
            });
        } catch (error) {
            this.logger.error('Error fetching worlds:', error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to fetch worlds',
            });
        }
    }

    async getById(req, res) {
        const { worldId } = req.params;

        try {
            const world = await this.worldService.getWorldById(worldId);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'World found successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error fetching world with ID ${worldId}: ${error}`, error);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to fetch world',
            });
        }
    }

    async create(req, res) {
        try {
            const worldData = new this.WorldModel(req.body);
            const newWorld = await this.worldService.createWorld(worldData);

            return res.status(201).json({
                status: 'success',
                message: 'World created successfully',
                data: newWorld,
            });
        } catch (error) {
            if (error.status === 409) {
                return res.status(409).json({
                    status: 'error',
                    message: `A world with the name '${error.message}' already exists.`,
                });
            }

            return res.status(500).json({
                status: 'error',
                message: 'Failed to create world',
            });
        }
    }

    async update(req, res) {
        const { worldId } = req.params;

        try {
            const worldData = new this.WorldModel(req.body);
            const updatedWorld = await this.worldService.updateWorld(worldId, worldData);

            if (!updatedWorld) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'World updated successfully',
                data: updatedWorld,
            });
        } catch (error) {
            this.logger.error(`Error updating world with ID ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to update world',
            });
        }
    }

    async delete(req, res) {
        const { worldId } = req.params;

        try {
            const deleted = await this.worldService.deleteWorld(worldId);

            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'World deleted successfully',
            });
        } catch (error) {
            this.logger.error(`Error deleting world with ID ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to delete world',
            });
        }
    }

    // Faction Management

    async addFaction(req, res) {
        const { worldId } = req.params;
        const { factionData } = req.body;

        try {
            const world = await this.worldService.addFactionToWorld(worldId, factionData);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Faction added to world successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error adding faction to world ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to add faction',
            });
        }
    }

    // Region Management

    async addRegion(req, res) {
        const { worldId } = req.params;
        const { regionData } = req.body;
        try {
            const world = await this.worldService.addRegionToWorld(worldId, regionData);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Region added to world successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error adding region to world ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to add region',
            });
        }
    }

    async addGlobalItem(req, res) {
        const { worldId } = req.params;
        const { itemData } = req.body;
        try {
            const world = await this.worldService.addGlobalItemToWorld(worldId, itemData);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Global item added to world successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error adding global item to world ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to add global item',
            });
        }
    }

    // Economy Management

    async updateEconomy(req, res) {
        const { worldId } = req.params;
        const { newEconomyState } = req.body;
        try {
            const world = await this.worldService.updateEconomy(worldId, newEconomyState);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Economy state updated successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error updating economy state for world ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to update economy state',
            });
        }
    }

    // Event Management

    async addEvent(req, res) {
        const { worldId } = req.params;
        const { eventData } = req.body;
        try {
            const world = await this.worldService.addEventToWorld(worldId, eventData);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Event added to world successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error adding event to world ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to add event',
            });
        }
    }

    // Player Management

    async addPlayer(req, res) {
        const { worldId } = req.params;
        const { playerId } = req.params;

        try {
            const player = await this.playerService.getPlayerOverview(playerId);

            if (!player) return res.status(404).json({
                status: 'error',
                message: `Player not found: ${playerId}`
            });

            const world = await this.worldService.addPlayerToWorld(worldId, player);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Player added to world successfully',
                data: world,
            });
        } catch (error) {
            this.logger.error(`Error adding player to world ${worldId}:`, error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to add player',
            });
        }
    }

    async removePlayer(req, res) {
        const { worldId } = req.params;
        const { playerId } = req.params;

        try {
            const world = await this.worldService.removePlayerFromWorld(worldId, playerId);

            if (!world) {
                return res.status(404).json({
                    status: 'error',
                    message: 'World or Player not found.',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Player removed from world successfully.',
            });
        } catch (error) {
            this.logger.error(`Error removing player (${playerId}) from world: ${worldId}`);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to remove player from world',
            });
        }
    }
}

module.exports = WorldController;
