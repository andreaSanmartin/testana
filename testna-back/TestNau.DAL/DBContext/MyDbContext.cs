using Microsoft.Extensions.Configuration;
using Npgsql; // Cambiar MySqlConnector por Npgsql
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace TestNau.DAL.DBContext
{
    public class MyDbContext : IDbContext
    {
        public readonly string _connectionString;

        public MyDbContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PostgresqlDBConnection");
        }

        public void excecuteQuery(string query)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                SqlMapper.Query(conn, query, commandType: CommandType.Text, commandTimeout: 1200);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public void excecuteQuery(string query, object parameters)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                SqlMapper.Query(conn, query, param: parameters, commandType: CommandType.Text, commandTimeout: 2000);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public async Task excecuteQueryAsync(string query)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                await SqlMapper.QueryAsync(conn, query, commandType: CommandType.Text);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public async Task excecuteQueryAsync(string query, object parameters)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                await SqlMapper.QueryAsync(conn, query, param: parameters, commandType: CommandType.Text);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public List<T> getList<T>(string query)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                return SqlMapper.Query<T>(conn, query, commandType: CommandType.Text, commandTimeout: 636600).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public List<T> getList<T>(string query, object parameters)
        {
            var conn = new NpgsqlConnection(_connectionString);
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                return SqlMapper.Query<T>(conn, query, param: parameters, commandType: CommandType.Text, commandTimeout: 400).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public T getObject<T>(string query)
        {
            var conn = new NpgsqlConnection(_connectionString);
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var l = SqlMapper.Query<T>(conn, query, commandType: CommandType.Text, commandTimeout: 800).ToList();
                if (l.Count > 0)
                    return l[0];
                else
                    return default(T);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public T getObject<T>(string query, object parameters)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var l = SqlMapper.Query<T>(conn, query, param: parameters, commandType: CommandType.Text, commandTimeout: 800).ToList();

                if (l.Count > 0)
                    return l[0];
                else
                    return default(T);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar sql: " + ex.Message, ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public void excecuteProcedure(string query, Object parameters)
        {
            var conn = new NpgsqlConnection(_connectionString); 
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                SqlMapper.Query(conn, query, param: parameters, commandType: CommandType.StoredProcedure, commandTimeout: 2800); 
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ejecutar procedure", ex);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }
    }
}