using TestNau.DAL.DBContext;
using TestNau.MODEL;

namespace TestNau.DAL
{
    public class DetailOrderRepository
    {
        private readonly IDbContext _dbContext;

        public DetailOrderRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public DetailOrderModel Save(DetailOrderModel model)
        {
            string sql = $@"INSERT INTO detail_order
                            (do_cod_header, do_subtotal, do_iva, do_total)
                            VALUES(@do_cod_header, @do_subtotal, @do_iva, @do_total) RETURNING *";
            return _dbContext.getObject<DetailOrderModel>(sql, model);
        }

        public DetailOrderModel Update(DetailOrderModel model)
        {
            string sql = $@"UPDATE detail_order
                            SET do_cod_header=@do_cod_header, do_subtotal=@do_subtotal, 
                                do_iva=@do_iva, do_total=@do_total
                            WHERE do_code=@do_code RETURNING *";
            return _dbContext.getObject<DetailOrderModel>(sql, model);
        }

        public DetailOrderModel GetByPk(int code)
        {
            string sql = $@"SELECT *
                            FROM detail_order
                            WHERE do_code = {code};";
            return _dbContext.getObject<DetailOrderModel>(sql);
        }

        public List<DetailOrderModel> GetAll()
        {
            string sql = $@"SELECT *
                            FROM detail_order;";
            return _dbContext.getList<DetailOrderModel>(sql);
        }

        public DetailOrderModel GetByHeard(int heard)
        {
            string sql = $@"SELECT *
                            FROM detail_order
                            WHERE do_cod_header = {heard};";
            return _dbContext.getObject<DetailOrderModel>(sql);
        }
    }
}
