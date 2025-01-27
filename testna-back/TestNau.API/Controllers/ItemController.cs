using Microsoft.AspNetCore.Mvc;
using Ocelot.Values;
using TestNau.BLL;
using TestNau.MODEL;

namespace TestNau.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemService _itemService;

        public ItemController(ItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("all")]
        public ActionResult<List<ItemModel>> GetAll()
        {
            try
            {
                return Ok(_itemService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("by/{id}")]
        public ActionResult<ItemModel> GetByPk(int id)
        {
            try
            {
                return Ok(_itemService.GetByPk(id));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpGet("by/bar/{code}")]
        public ActionResult<ItemModel> GetByBarCode(string code)
        {
            try
            {
                return Ok(_itemService.GetByBarCod(code));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("first")]
        public ActionResult<List<ItemModel>> GetFirst()
        {
            try
            {
                return Ok(_itemService.GetFirst());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("by/data/{data}")]
        public ActionResult<List< ItemModel>> GetByData(string data)
        {
            try
            {
                return Ok(_itemService.GetByData(data));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
