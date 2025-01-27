using TestNau.DAL;
using TestNau.MODEL;

namespace TestNau.BLL
{
    public class StatusService
    {
        private readonly StatusRepository _statusRepository;

        public StatusService(StatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public StatusModel Save(StatusModel model)
        {
            return _statusRepository.Save(model);
        }

        public StatusModel Update(StatusModel model)
        {
            return _statusRepository.Update(model);
        }

        public StatusModel GetByPk(int code)
        {
            return _statusRepository.GetByPk(code);
        }

        public List<StatusModel> GetAll()
        {
            return _statusRepository.GetAll();
        }
    }
}
