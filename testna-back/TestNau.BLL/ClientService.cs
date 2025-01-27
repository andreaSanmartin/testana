using TestNau.DAL;
using TestNau.MODEL;

namespace TestNau.BLL
{
    public class ClientService
    {
        private readonly ClientRepository _clientRepository;

        public ClientService(ClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public ClientModel Save(ClientModel model)
        {
            return _clientRepository.Save(model);
        }

        public ClientModel Update(ClientModel model)
        {
            return _clientRepository.Update(model);
        }

        public ClientModel GetByPk(int code)
        {
            return _clientRepository.GetByPk(code);
        }

        public List<ClientModel> GetAll()
        {
            return _clientRepository.GetAll();
        }

        public ClientModel GetById(string id)
        {
            return _clientRepository.GetById(id);
        }

        public ClientModel GetByName(string name)
        {
            return _clientRepository.GetByName(name);
        }

        public List<ClientModel> GetByData(string id)
        {
            return _clientRepository.GetByData(id);
        } 

        public List<ClientModel> GetAllFirst()
        {
            return _clientRepository.First();
        }
    }
}
