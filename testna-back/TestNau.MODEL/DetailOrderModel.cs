using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestNau.MODEL
{
    public class DetailOrderModel
    {
        public int do_code { get; set; }
        public int do_cod_header { get; set; }
        public double do_subtotal { get; set; }
        public int do_iva { get; set; }
        public double do_total { get; set; }
        
    }
}
