using Microsoft.AspNetCore.Mvc;
using Ocelot.Values;
using TestNau.BLL;
using TestNau.MODEL;
using TestNau.MODEL.DTO;

namespace TestNau.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly HeaderOrderService _headerOrderService;

        public OrderController(HeaderOrderService headerOrderService)
        {
            _headerOrderService = headerOrderService;
        }

        [HttpGet("code")]
        public ActionResult<int> GetCode()
        {
            try
            {
                return Ok(_headerOrderService.GetCode());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("save")]
        public IActionResult SubmitFormDTO(OrderDTO model)
        {
            try
            {
                _headerOrderService.SaveDTO(model);
                return Ok(new { message = "Guardado Correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }




        [HttpPost("update")]
        public IActionResult UpdateFormDTO(OrderDTO model)
        {
            try
            {
                _headerOrderService.UpdateDTO(model);
                return Ok(new { message = "Guardado Correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpGet("all")]
        public ActionResult<int> GetAllDTO()
        {
            try
            {
                return Ok(_headerOrderService.GetAllDTO());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
