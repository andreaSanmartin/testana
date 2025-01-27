using TestNau.DAL.DBContext;
using TestNau.MODEL;

namespace TestNau.DAL
{
    public class ItemRepository
    {
        private readonly IDbContext _dbContext;

        public ItemRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ItemModel Save(ItemModel model)
        {
            string sql = $@"INSERT INTO test_na.items
                            (it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
                            VALUES(@it_description, @it_bar_code, @it_price, @it_iva, @it_stock, @it_value_iva);
                            SELECT * FROM test_na.items WHERE it_code = LAST_INSERT_ID();";
            return _dbContext.getObject<ItemModel>(sql, model);
        }

        public ItemModel Update(ItemModel model)
        {
            string sql = $@"UPDATE test_na.items
                            SET it_description=@it_description, 
                                it_bar_code=@it_bar_code, 
                                it_price=@it_price, 
                                it_iva=@it_iva, 
                                it_stock=@it_stock, 
                                it_value_iva=@it_value_iva
                            WHERE it_code=@it_code;
                            SELECT * FROM test_na.items WHERE it_code = @it_code;";
            return _dbContext.getObject<ItemModel>(sql, model);
        }

        public ItemModel GetByPk(int code)
        {
            string sql = $@"SELECT *
                            FROM test_na.items
                            WHERE it_code = {code}
                            ORDER BY it_code ASC;";
            return _dbContext.getObject<ItemModel>(sql);
        }

        public ItemModel GetByBarCod(string code)
        {
            string sql = $@"SELECT *
                            FROM test_na.items
                            WHERE it_bar_code like ('%{code}%')
                            ORDER BY it_bar_code ASC;";
            return _dbContext.getObject<ItemModel>(sql);
        }

        public List<ItemModel> GetAll()
        {
            string sql = $@"SELECT *
                            FROM test_na.items
                            ORDER BY it_description ASC;";
            return _dbContext.getList<ItemModel>(sql);
        }

        public List<ItemModel> GetByData(string data)
        {
            string sql = $@"SELECT *
                            FROM test_na.items
                            WHERE it_bar_code LIKE '%{data}%'
                            OR CONCAT(it_code) LIKE '% {data}%'
                            ORDER BY it_description ASC;";
            return _dbContext.getList<ItemModel>(sql);
        }

        public List<ItemModel> GetFirst()
        {
            string sql = $@"SELECT *
                            FROM test_na.items
                            ORDER BY it_description ASC
                            LIMIT 10;";
            return _dbContext.getList<ItemModel>(sql);
        }


        public List<ItemModel> GetByCodes(List<int> codes)
        {
            string sql = $@"SELECT *
                            FROM test_na.items
                            WHERE it_code IN ({String.Join(",", codes)});";
            return _dbContext.getList<ItemModel>(sql);
        }
    }
}
