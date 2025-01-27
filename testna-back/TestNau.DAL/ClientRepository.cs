using System.Xml.Linq;
using TestNau.DAL.DBContext;
using TestNau.MODEL;

namespace TestNau.DAL
{
    public class ClientRepository
    {
        private readonly IDbContext _dbContext;

        public ClientRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ClientModel Save (ClientModel model)
        {
            string sql = $@"INSERT INTO test_na.client
                            (cl_name, cl_id)
                            VALUES(@cl_name, @cl_id);
                            SELECT * FROM test_na.client WHERE cl_code = LAST_INSERT_ID(); *";
            return _dbContext.getObject<ClientModel>(sql, model);
        }

        public ClientModel Update(ClientModel model)
        {
            string sql = $@"UPDATE test_na.client
                            SET cl_name=@cl_name, cl_id=@cl_id
                            WHERE cl_code=@cl_code;
                            SELECT * FROM test_na.client WHERE cl_code = LAST_INSERT_ID();";
            return _dbContext.getObject<ClientModel>(sql, model);
        }

        public ClientModel GetByPk(int code)
        {
            string sql = $@"SELECT *
                            FROM test_na.client
                            WHERE cl_code = {code}
                            ORDER BY cl_code ASC;";
            return _dbContext.getObject<ClientModel>(sql);
        }

        public List<ClientModel> GetAll()
        {
            string sql = $@"SELECT *
                            FROM test_na.client
                            ORDER BY cl_name ASC;";
            return _dbContext.getList<ClientModel>(sql);
        }

        public ClientModel GetById(string id)
        {
            string sql = $@"SELECT *
                            FROM test_na.client
                            WHERE cl_id LIKE '%{id}%'
                            ORDER BY cl_id ASC;";
            return _dbContext.getObject<ClientModel>(sql);
        }

        public ClientModel GetByName(string name)
        {
            string sql = $@"SELECT *
                            FROM test_na.client
                            WHERE lower(cl_name) LIKE lower('%{name}%')
                            ORDER BY cl_name ASC;";
            return _dbContext.getObject<ClientModel>(sql);
        }

        public List<ClientModel> GetByData(string data)
        {
            string sql = $@"SELECT *
                            FROM test_na.client
                            WHERE cl_id LIKE '%{data}%'
                            OR lower(cl_name) LIKE lower('%{data}%')
                            OR CONCAT(cl_code) LIKE '%{data}%'
                            ORDER BY cl_name ASC;";
            return _dbContext.getList<ClientModel>(sql);
        }

        public List<ClientModel> First()
        {
            string sql = $@"SELECT *
                            FROM test_na.client
                            ORDER BY cl_name ASC
                            LIMIT 10;";
            return _dbContext.getList<ClientModel>(sql);
        }
    }
}
