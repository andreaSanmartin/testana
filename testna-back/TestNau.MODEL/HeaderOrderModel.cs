using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestNau.MODEL
{
    public class HeaderOrderModel
    {
        public int ho_code {  get; set; }
        public int ho_cod_client { get; set; }
        public DateTime ho_date_registration { get; set; }
        public int ho_state { get; set; }
    }
}
