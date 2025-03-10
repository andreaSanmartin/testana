﻿using TestNau.DAL.DBContext;
using TestNau.MODEL;

namespace TestNau.DAL
{
    public class HeaderOrderRepository
    {
        private readonly IDbContext _dbContext;

        public HeaderOrderRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public HeaderOrderModel Save(HeaderOrderModel model)
        {
            string sql = $@"INSERT INTO header_order
                            (ho_cod_client, ho_date_registration, ho_state)
                            VALUES(@ho_cod_client, @ho_date_registration, @ho_state) RETURNING *";
            return _dbContext.getObject<HeaderOrderModel>(sql, model);
        }

        public HeaderOrderModel Update(HeaderOrderModel model)
        {
            string sql = $@"UPDATE header_order
                            SET ho_cod_client=@ho_cod_client, 
                                ho_date_registration=@ho_date_registration, 
                                ho_state=@ho_state
                            WHERE ho_code=@ho_code RETURNING *;";
            return _dbContext.getObject<HeaderOrderModel>(sql, model);
        }

        public HeaderOrderModel GetByPk(int code)
        {
            string sql = $@"SELECT *
                            FROM header_order
                            WHERE ho_code = {code};";
            return _dbContext.getObject<HeaderOrderModel>(sql);
        }

        public List<HeaderOrderModel> GetAll()
        {
            string sql = $@"SELECT *
                            FROM header_order;";
            return _dbContext.getList<HeaderOrderModel>(sql);
        }

        public int GetCode()
        {
            string sql = $@"SELECT ho_code
                            FROM header_order
                            ORDER BY ho_code DESC
                            LIMIT 1;";
            return _dbContext.getObject<int>(sql);
        }
    }
}
