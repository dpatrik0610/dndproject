class Equipment {
  constructor({
    equipmentId,
    index = "unknown-item",
    name = "Unnamed Equipment",
    equipment_category = { index: "unknown-category", name: "Miscellaneous", url: "#" },
    gear_category = { index: "unknown-gear", name: "Miscellaneous Gear", url: "#" },
    cost = { quantity: 0, unit: "gp" },
    weight = 0,
    desc = ["No description available."],
    url = "#",
    special = ["No special features."],
    contents = [],
    properties = []
  } = {}) {
    this.equipmentId = equipmentId;
    this.index = index;
    this.name = name;
    this.equipmentCategory = equipment_category;
    this.gearCategory = gear_category;
    this.cost = cost;
    this.weight = weight;
    this.description = desc;
    this.url = url;
    this.specialFeatures = special;
    this.contents = contents;
    this.properties = properties;
  }

  getDetails() {
    return {
      index: this.index,
      name: this.name,
      category: this.equipmentCategory.name,
      gearType: this.gearCategory.name,
      cost: `${this.cost.quantity} ${this.cost.unit}`,
      weight: `${this.weight} lb`,
      description: this.description.join(" "),
      specialFeatures: this.specialFeatures.join(", "),
      contents: this.contents.length ? this.contents : [],
      properties: this.properties.length ? this.properties : [],
      url: this.url
    };
  }
}
