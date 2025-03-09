using TestNau.DAL.DBContext;
using TestNau.MODEL;

namespace TestNau.DAL
{
    public class ItemDetailRepository
    {
        private readonly IDbContext _dbContext;

        public ItemDetailRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ItemDetailModel Save(ItemDetailModel model)
        {
            string sql = $@"INSERT INTO item_detail
                            (id_cod_item, id_cod_detail, id_amount, id_price, id_total)
                            VALUES(@id_cod_item, @id_cod_detail, @id_amount, @id_price, @id_total) RETURNING *";
            return _dbContext.getObject<ItemDetailModel>(sql, model);
        }

        public ItemDetailModel Update(ItemDetailModel model)
        {
            string sql = $@"UPDATE item_detail
                            SET id_cod_item=@id_cod_item, 
                                id_cod_detail=@id_cod_detail, 
                                id_amount=@id_amount, 
                                id_price=@id_price, 
                                id_total=@id_total
                            WHERE id_code=@id_code RETURNING *";
            return _dbContext.getObject<ItemDetailModel>(sql, model);
        }

        public ItemDetailModel GetByPk(int code)
        {
            string sql = $@"SELECT *
                            FROM item_detail
                            WHERE id_code = {code};";
            return _dbContext.getObject<ItemDetailModel>(sql);
        }

        public List<ItemDetailModel> GetAll()
        {
            string sql = $@"SELECT *
                            FROM item_detail;";
            return _dbContext.getList<ItemDetailModel>(sql);
        }

        public List<ItemDetailModel> getByDetail(int detail)
        {
            string sql = $@"SELECT *
                            FROM item_detail
                            WHERE id_cod_detail = {detail};";
            return _dbContext.getList<ItemDetailModel>(sql);
        }

        public List<ItemDetailModel> GetByCodes(List<int> codes)
        {
            string sql = $@"SELECT *
                            FROM item_detail
                            WHERE id_code IN ({String.Join(",", codes)});";
            return _dbContext.getList<ItemDetailModel>(sql);
        }
    }
}
