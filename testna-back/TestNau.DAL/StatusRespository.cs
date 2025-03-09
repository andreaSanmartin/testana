using TestNau.DAL.DBContext;
using TestNau.MODEL;

namespace TestNau.DAL
{
    public class StatusRepository
    {
        private readonly IDbContext _dbContext;

        public StatusRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public StatusModel Save(StatusModel model)
        {
            string sql = $@"INSERT INTO status
                            (st_name, st_description)
                            VALUES(@st_name, @st_description);
                            SELECT * FROM status WHERE st_code = LAST_INSERT_ID();";
            return _dbContext.getObject<StatusModel>(sql, model);
        }

        public StatusModel Update(StatusModel model)
        {
            string sql = $@"UPDATE status
                            SET st_name=@st_name, 
                                st_description=@st_description
                            WHERE st_code=@st_code;
                            SELECT * FROM status WHERE st_code = @st_code;";
            return _dbContext.getObject<StatusModel>(sql, model);
        }

        public StatusModel GetByPk(int code)
        {
            string sql = $@"SELECT *
                            FROM status
                            WHERE st_code = {code};";
            return _dbContext.getObject<StatusModel>(sql);
        }

        public List<StatusModel> GetAll()
        {
            string sql = $@"SELECT *
                            FROM status;";
            return _dbContext.getList<StatusModel>(sql);
        }
    }
}
