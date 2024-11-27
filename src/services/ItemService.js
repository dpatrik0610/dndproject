class ItemService {
    constructor(itemRepository) {
      this.itemRepository = itemRepository;
    }
  
    async getItems() {
      return this.itemRepository.getAll();
    }
  
    async createItem(itemData) {
      return this.itemRepository.create(itemData);
    }
  }
  
  module.exports = ItemService;
  