using TestNau.DAL;
using TestNau.MODEL;

namespace TestNau.BLL
{
    public class ItemDetailService
    {
        private readonly ItemDetailRepository _itemDetailRepository;

        public ItemDetailService(ItemDetailRepository itemDetailRepository)
        {
            _itemDetailRepository = itemDetailRepository;
        }

        public ItemDetailModel Save(ItemDetailModel model)
        {
            return _itemDetailRepository.Save(model);
        }

        public ItemDetailModel Update(ItemDetailModel model)
        {
            return _itemDetailRepository.Update(model);
        }

        public ItemDetailModel GetByPk(int code)
        {
            return _itemDetailRepository.GetByPk(code);
        }

        public List<ItemDetailModel> GetAll()
        {
            return _itemDetailRepository.GetAll();
        }

        public List<ItemDetailModel> GetByDetail(int detail)
        {
            return _itemDetailRepository.getByDetail(detail);
        }

        public List<ItemDetailModel> GetByCodes(List<int> codes)
        {
            return _itemDetailRepository.GetByCodes(codes);
        }
    }
}
