const express = require('express');

module.exports = (container, app) => {
    const router = express.Router();
    const logger = container.get('logger');
    const logEndpoints = container.get('logEndpoints');

    try {
        router.get('/', (req, res) => {
            const endpoints = logEndpoints(app);

            const groupedEndpoints = endpoints.reduce((groups, endpoint) => {
                const basePath = endpoint.path.split('/')[2];
                const groupName = basePath ? basePath.charAt(0).toUpperCase() + basePath.slice(1) : 'Other';

                if (!groups[groupName]) {
                    groups[groupName] = [];
                }

                groups[groupName].push({
                    path: endpoint.path,
                    methods: endpoint.methods,
                });

                return groups;
            }, {});

            res.json({
                message: "Available API Endpoints",
                groupedEndpoints,
            });
        });

        logger.success('Information Module loaded.');
    } catch (err) {
        logger.error(`Error initializing Information Module: ${err.message}`);
    }

    return router;
};