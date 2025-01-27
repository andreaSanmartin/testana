using TestNau.DAL;
using TestNau.MODEL;

namespace TestNau.BLL
{
    public class ItemService
    {
        private readonly ItemRepository _itemRepository;

        public ItemService(ItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public ItemModel Save(ItemModel model)
        {
            return _itemRepository.Save(model);
        }

        public ItemModel Update(ItemModel model)
        {
            return _itemRepository.Update(model);
        }

        public ItemModel GetByPk(int code)
        {
            return _itemRepository.GetByPk(code);
        }

        public ItemModel GetByBarCod(string code)
        {
            return _itemRepository.GetByBarCod(code);
        }

        public List<ItemModel> GetAll()
        {
            return _itemRepository.GetAll();
        }

        public List<ItemModel> GetByCodes(List<int> codes)
        {
            return _itemRepository.GetByCodes(codes);
        }

        public List<ItemModel> GetByData(string data)
        {
            return _itemRepository.GetByData(data);
        }

        public List<ItemModel> GetFirst()
        {
            return _itemRepository.GetFirst();
        }
    }
}
