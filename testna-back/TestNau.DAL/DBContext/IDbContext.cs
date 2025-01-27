using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestNau.DAL.DBContext {
    public interface IDbContext {
        List<T> getList<T>(string query);
        List<T> getList<T>(string query, Object parameters);
        T getObject<T>(string query);
        T getObject<T>(string query, object parameters);
        Task excecuteQueryAsync(string query);
        Task excecuteQueryAsync(string query, Object parameters);
        void excecuteQuery(string query);
        void excecuteQuery(string query, Object parameters);
        void excecuteProcedure(string query, Object parameters);
    }
}
