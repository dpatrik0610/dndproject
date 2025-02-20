const LayeredError = require('../utils/LayeredError');

class EquipmentRepository {
    constructor(equipmentCollection, EquipmentModel) {
        this.equipmentCollection = equipmentCollection;
        this.EquipmentModel = EquipmentModel;
    }

    async getAll() {
        try {
            return await this.equipmentCollection.find().toArray();
        } catch (error) {
            throw new LayeredError("Failed to fetch all equipment.", "Equipment Repository", 500, error);
        }
    }

    async getByIndex(equipmentId) {
        try {
            const equipment = await this.equipmentCollection.findOne({ _id: equipmentId });
            return equipment || null;
        } catch (error) {
            throw new LayeredError(`Failed to fetch equipment with ID: ${equipmentId}.`, "Equipment Repository", 500, error);
        }
    }

    async getByName(name) {
        try {
            const equipment = await this.equipmentCollection.findOne({ name });
            return equipment || null;
        } catch (error) {
            throw new LayeredError(`Failed to fetch equipment with name: ${name}.`, "Equipment Repository", 500, error);
        }
    }

    async create(equipment) {
        try {
            if (!(equipment instanceof this.EquipmentModel)) {
                throw new LayeredError(
                    "Argument is not a valid Equipment instance.",
                    "Equipment Repository",
                    400
                );
            }

            const result = await this.equipmentCollection.insertOne(equipment);
            return { _id: result.insertedId, ...equipment };
        } catch (error) {
            if (error instanceof LayeredError) throw error;
            throw new LayeredError("Failed to create equipment.", "Equipment Repository", 500, error);
        }
    }

    async update(equipmentId, updateData) {
        try {
            if (typeof updateData !== "object" || Array.isArray(updateData)) {
                throw new LayeredError(
                    "Update data must be an object.",
                    "Equipment Repository",
                    400
                );
            }

            const result = await this.equipmentCollection.updateOne(
                { _id: equipmentId },
                { $set: updateData }
            );

            if (result.matchedCount === 0) {
                throw new LayeredError(
                    `No equipment found with ID: ${equipmentId}.`,
                    "Equipment Repository",
                    404
                );
            }

            return { equipmentId, ...updateData };
        } catch (error) {
            if (error instanceof LayeredError) throw error;
            throw new LayeredError(
                `Failed to update equipment with ID: ${equipmentId}.`,
                "Equipment Repository",
                500,
                error
            );
        }
    }

    async delete(equipmentId) {
        try {
            const result = await this.equipmentCollection.deleteOne({ _id: equipmentId });

            if (result.deletedCount === 0) {
                throw new LayeredError(
                    `No equipment found with ID: ${equipmentId}.`,
                    "Equipment Repository",
                    404
                );
            }

            return { success: true, equipmentId };
        } catch (error) {
            if (error instanceof LayeredError) throw error;
            throw new LayeredError(
                `Failed to delete equipment with ID: ${equipmentId}.`,
                "Equipment Repository",
                500,
                error
            );
        }
    }
}

module.exports = EquipmentRepository;
