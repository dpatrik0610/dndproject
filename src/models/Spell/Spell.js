class Spell {
    constructor({
      index,
      name,
      desc,
      higher_level,
      range,
      components,
      material,
      ritual,
      duration,
      concentration,
      casting_time,
      level,
      attack_type,
      damage,
      school,
      classes,
      subclasses,
      url,
    }) {
      this.index = index;
      this.name = name;
      this.desc = desc;
      this.higher_level = higher_level;
      this.range = range;
      this.components = components;
      this.material = material;
      this.ritual = ritual;
      this.duration = duration;
      this.concentration = concentration;
      this.casting_time = casting_time;
      this.level = level;
      this.attack_type = attack_type;
      this.damage = damage;
      this.school = school;
      this.classes = classes;
      this.subclasses = subclasses;
      this.url = url;
    }
  
    // Get damage at a specific spell slot level
    getDamageAtSlotLevel(slotLevel) {
      return this.damage.damage_at_slot_level[slotLevel] || 'No damage at this level';
    }
  
    // Get the names of classes that can cast this spell
    getCastingClasses() {
      return this.classes.map(cls => cls.name).join(', ');
    }
  
    // Get the names of subclasses associated with the spell
    getSubclasses() {
      return this.subclasses.map(subclass => subclass.name).join(', ');
    }
  
    // Check if the spell requires concentration
    requiresConcentration() {
      return this.concentration ? 'Yes' : 'No';
    }
  
    // Check if the spell is a ritual
    isRitual() {
      return this.ritual ? 'Yes' : 'No';
    }
  
    // Get the full description of the spell
    getFullDescription() {
      return [...this.desc, ...this.higher_level].join(' ');
    }
  
    getSpellInfo() {
        return {
          index: this.index,
          name: this.name,
          description: this.desc.join(' '),
          higher_level: this.higher_level.join(' '),
          range: this.range,
          components: this.components.join(', '),
          material: this.material,
          ritual: this.isRitual(),
          duration: this.duration,
          concentration: this.requiresConcentration(),
          casting_time: this.casting_time,
          level: this.level,
          attack_type: this.attack_type,
          damage: {
            damage_type: this.damage.damage_type,
            damage_at_slot_level: this.damage.damage_at_slot_level
          },
          school: this.school.name,
          classes: this.getCastingClasses(),
          subclasses: this.getSubclasses(),
          url: this.url
        };
      }
      
  }