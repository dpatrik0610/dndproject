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
            return res.json({ status: 'success', data: worlds });
        } catch (error) {
            this.handleError(res, error, 'Failed to fetch worlds');
        }
    }

    async getById(req, res) {
        const { worldId } = req.params;

        try {
            const world = await this.worldService.getWorldById(worldId);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to fetch world');
        }
    }

    async create(req, res) {
        try {
            const worldData = new this.WorldModel(req.body);
            const newWorld = await this.worldService.createWorld(worldData);

            return res.status(201).json({ status: 'success', data: newWorld });
        } catch (error) {
            if (error instanceof LayeredError && error.statusCode === 409) {
                return res.status(409).json({ status: 'error', message: `World '${error.message}' already exists` });
            }
            this.handleError(res, error, 'Failed to create world');
        }
    }

    async update(req, res) {
        const { worldId } = req.params;

        try {
            const worldData = new this.WorldModel(req.body);
            const updatedWorld = await this.worldService.updateWorld(worldId, worldData);

            if (!updatedWorld) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: updatedWorld });
        } catch (error) {
            this.handleError(res, error, 'Failed to update world');
        }
    }

    async delete(req, res) {
        const { worldId } = req.params;

        try {
            const deleted = await this.worldService.deleteWorld(worldId);

            if (!deleted) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', message: 'World deleted' });
        } catch (error) {
            this.handleError(res, error, 'Failed to delete world');
        }
    }

    // Faction Management

    async addFaction(req, res) {
        const { worldId } = req.params;
        const { factionData } = req.body;

        try {
            const world = await this.worldService.addFactionToWorld(worldId, factionData);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to add faction');
        }
    }

    // Region Management

    async addRegion(req, res) {
        const { worldId } = req.params;
        const { regionData } = req.body;
        try {
            const world = await this.worldService.addRegionToWorld(worldId, regionData);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to add region');
        }
    }

    async addGlobalItem(req, res) {
        const { worldId } = req.params;
        const { itemData } = req.body;
        try {
            const world = await this.worldService.addGlobalItemToWorld(worldId, itemData);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to add global item');
        }
    }

    // Economy Management

    async updateEconomy(req, res) {
        const { worldId } = req.params;
        const { newEconomyState } = req.body;
        try {
            const world = await this.worldService.updateEconomy(worldId, newEconomyState);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to update economy state');
        }
    }

    // Event Management

    async addEvent(req, res) {
        const { worldId } = req.params;
        const { eventData } = req.body;
        try {
            const world = await this.worldService.addEventToWorld(worldId, eventData);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to add event');
        }
    }

    // Player Management

    async addPlayer(req, res) {
        const { worldId } = req.params;
        const { playerId } = req.params;

        try {
            const player = await this.playerService.getPlayerOverview(playerId);

            if (!player) return res.status(404).json({ status: 'error', message: `Player not found: ${playerId}` });

            const world = await this.worldService.addPlayerToWorld(worldId, player);

            if (!world) return res.status(404).json({ status: 'error', message: 'World not found' });

            return res.json({ status: 'success', data: world });
        } catch (error) {
            this.handleError(res, error, 'Failed to add player');
        }
    }

    async removePlayer(req, res) {
        const { worldId } = req.params;
        const { playerId } = req.params;

        try {
            const world = await this.worldService.removePlayerFromWorld(worldId, playerId);

            if (!world) return res.status(404).json({ status: 'error', message: 'World or Player not found' });

            return res.json({ status: 'success', message: 'Player removed' });
        } catch (error) {
            this.handleError(res, error, 'Failed to remove player');
        }
    }

    // Utility Method to Handle Errors
    handleError(res, error, defaultMessage) {
        this.logger.error(error);
        
        if (error instanceof LayeredError) {
            return res.status(error.statusCode || 500).json({
                status: 'error',
                message: error.message || defaultMessage,
            });
        }

        return res.status(500).json({
            status: 'error',
            message: defaultMessage || 'Internal Server Error',
        });
    }
}

module.exports = WorldController;
