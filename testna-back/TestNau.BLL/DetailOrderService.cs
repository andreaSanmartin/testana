using TestNau.DAL;
using TestNau.MODEL;

namespace TestNau.BLL
{
    public class DetailOrderService
    {
        private readonly DetailOrderRepository _detailOrderRepository;

        public DetailOrderService(DetailOrderRepository detailOrderRepository)
        {
            _detailOrderRepository = detailOrderRepository;
        }

        public DetailOrderModel Save(DetailOrderModel model)
        {
            return _detailOrderRepository.Save(model);
        }

        public DetailOrderModel Update(DetailOrderModel model)
        {
            return _detailOrderRepository.Update(model);
        }

        public DetailOrderModel GetByPk(int code)
        {
            return _detailOrderRepository.GetByPk(code);
        }

        public List<DetailOrderModel> GetAll()
        {
            return _detailOrderRepository.GetAll();
        }

        public DetailOrderModel GetByHeard(int code)
        {
            return _detailOrderRepository.GetByHeard(code);
        }
    }
}
