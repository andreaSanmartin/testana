using Microsoft.AspNetCore.Mvc;
using TestNau.BLL;
using TestNau.MODEL;

namespace TestNau.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly StatusService _statusService;

        public StateController(StatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpGet("all")]
        public ActionResult<StatusModel> GetAll()
        {
            try
            {
                return Ok(_statusService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }
}
