using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestNau.MODEL.DTO
{
    public class OrderDTO
    {
        public int ho_code { get; set; }
        public int ho_cod_client { get; set; }
        public string? ho_name { get; set; }
        public string? ho_ruc { get; set; }
        public DateTime ho_date_registration { get; set; }
        public int ho_state { get; set; }
        public string? ho_state_name { get; set; }
        public int? ho_cod_detail { get; set; }
        public double ho_subtotal { get; set; }
        public bool ho_iva { get; set; }
        public double ho_total { get; set; }
        public List<ItemsDTO> ho_items { get; set; }

        public OrderDTO Transform(HeaderOrderModel header, DetailOrderModel detail, List<ItemDetailModel> items, ClientModel client, StatusModel status, List<ItemModel> itemsname)
        {
            ho_code = header.ho_code;
            ho_cod_client = header.ho_cod_client;
            ho_name = client.cl_name;
            ho_ruc = client.cl_id;
            ho_date_registration = header.ho_date_registration;
            ho_state = header.ho_state;
            ho_state_name = status.st_name;
            ho_cod_detail = detail.do_code;
            ho_subtotal = detail.do_subtotal;
            ho_iva = detail.do_iva == 1 ? true : false;
            ho_total = detail.do_total;
            ho_items = new ItemsDTO().Transform(items, itemsname);
            return this;
        }
    }

    public class ItemsDTO
    {
        public int? ho_code_i { get; set; }
        public int ho_cod_item { get; set; }
        public string ho_item_name { get; set; }
        public string ho_item_bar { get; set; }
        public double ho_amount { get; set; }
        public double ho_price { get; set; }
        public double ho_total_item { get; set; }
        public double? ho_sub_total_item { get; set; }

        public List<ItemsDTO> Transform(List<ItemDetailModel> items, List<ItemModel> itemsname)
        {
            List<ItemsDTO> response = [];
            items.ForEach(item => { 
                ho_code_i = item.id_code;
                ho_cod_item = item.id_cod_item;
                ho_item_name = itemsname.Any() ?  itemsname.Find(p => p.it_code == item.id_cod_item).it_description :"";
                ho_item_bar = itemsname.Any() ? itemsname.Find(p => p.it_code == item.id_cod_item).it_bar_code : "";
                ho_amount = item.id_amount;
                ho_price = item.id_price;
                ho_total_item = item.id_total;
                response.Add(this);
            });
            return response;
        }

    }
}

