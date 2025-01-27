using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestNau.MODEL
{
    public class ItemModel
    {
        public int it_code {  get; set; }
        public string it_description { get; set; }
        public string it_bar_code { get; set; }
        public double it_price { get; set; }
        public bool it_iva { get; set; }
        public int it_stock { get; set; }
        public double it_value_iva { get; set; }

    }
}
