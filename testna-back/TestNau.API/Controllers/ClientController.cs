using Microsoft.AspNetCore.Mvc;
using TestNau.BLL;
using TestNau.MODEL;

namespace TestNau.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }


        [HttpGet("all")]
        public ActionResult<List<ClientModel>> GetAll()
        {
            try
            {
                return Ok(_clientService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("by/{id}")]
        public ActionResult<ClientModel> GetByPk(int id)
        {
            try
            {
                return Ok(_clientService.GetByPk(id));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpGet("by/id/{code}")]
        public ActionResult<ClientModel> GetById(string code)
        {
            try
            {
                return Ok(_clientService.GetById(code));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpGet("by/data/{code}")]
        public ActionResult<List<ClientModel>> GetByData(string code)
        {
            try
            {
                return Ok(_clientService.GetByData(code));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("by/name/{name}")]
        public ActionResult<ClientModel> GetByName(string name)
        {
            try
            {
                return Ok(_clientService.GetByName(name));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("first")]
        public ActionResult<List<ClientModel>> GetFirst()
        {
            try
            {
                return Ok(_clientService.GetAllFirst());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
