class DiceRoller {
    static rollDie(sides) {
        if (sides <= 0 || !Number.isInteger(sides)) {
            throw new Error("Invalid number of sides for die.");
        }
        return Math.floor(Math.random() * sides) + 1;
    }

    static rollMultipleDice(count, sides) {
        if (count <= 0 || !Number.isInteger(count)) {
            throw new Error("Invalid number of dice to roll.");
        }
        const rolls = [];
        for (let i = 0; i < count; i++) {
            rolls.push(this.rollDie(sides));
        }
        return rolls;
    }

    static rollWithAdvantage() {
        const roll1 = this.rollDie(20);
        const roll2 = this.rollDie(20);
        return Math.max(roll1, roll2);
    }

    static rollWithDisadvantage() {
        const roll1 = this.rollDie(20);
        const roll2 = this.rollDie(20);
        return Math.min(roll1, roll2);
    }

    static attackRoll(modifier = 0) {
        const roll = this.rollDie(20);
        return roll + modifier;
    }

    static damageRoll(diceCount, diceSides, modifier = 0) {
        const rolls = this.rollMultipleDice(diceCount, diceSides);
        const total = rolls.reduce((sum, roll) => sum + roll, 0);
        return total + modifier;
    }

    static savingThrow(modifier = 0) {
        return this.rollDie(20) + modifier;
    }

    static skillCheck(modifier = 0) {
        return this.rollDie(20) + modifier;
    }

    static initiativeRoll(modifier = 0) {
        return this.rollDie(20) + modifier;
    }

    static isCriticalHit(roll) {
        return roll === 20;
    }

    static hitDiceRoll(diceSides, constitutionModifier = 0) {
        return this.rollDie(diceSides) + constitutionModifier;
    }

    static rollPercentile() {
        return this.rollDie(100);
    }

    static calculateAttackRoll(rolledDie, abilityModifier, proficiencyBonus = 0, otherModifiers = 0) {
        return rolledDie + abilityModifier + proficiencyBonus + otherModifiers;
    }

    static isTargetHit(attackRoll, targetAC) {
        return attackRoll >= targetAC;
    }
}

module.exports = DiceRoller;
