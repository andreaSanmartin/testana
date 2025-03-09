using TestNau.DAL;
using TestNau.MODEL;
using TestNau.MODEL.DTO;

namespace TestNau.BLL
{
    public class HeaderOrderService
    {
        private readonly HeaderOrderRepository _headerOrderRepository;
        private readonly DetailOrderService _detailOrderService;
        private readonly ItemDetailService _itemDetailService;
        private readonly ClientService _clientService;
        private readonly StatusService _statusService;
        private readonly ItemService _itemService;

        public HeaderOrderService(HeaderOrderRepository headerOrderRepository, DetailOrderService detailOrderService,
            ItemDetailService itemDetailService, ClientService clientService, StatusService statusService, 
            ItemService itemService)
        {
            _headerOrderRepository = headerOrderRepository;
            _detailOrderService = detailOrderService;
            _itemDetailService = itemDetailService;
            _clientService = clientService;
            _statusService = statusService;
            _itemService = itemService;
        }

        public HeaderOrderModel Save(HeaderOrderModel model)
        {
            return _headerOrderRepository.Save(model);
        }

        public HeaderOrderModel Update(HeaderOrderModel model)
        {
            return _headerOrderRepository.Update(model);
        }

        public HeaderOrderModel GetByPk(int code)
        {
            return _headerOrderRepository.GetByPk(code);
        }

        public List<HeaderOrderModel> GetAll()
        {
            return _headerOrderRepository.GetAll();
        }

        public int GetCode()
        {
            int code = _headerOrderRepository.GetCode();
            return code != 0 ? code+1: 1;
        }

        public void SaveDTO(OrderDTO model)
        {
            HeaderOrderModel header = new()
            {
                ho_code = model.ho_code,
                ho_cod_client = model.ho_cod_client,
                ho_date_registration = model.ho_date_registration,
                ho_state = model.ho_state,
            };

            header = this.Save(header);

            DetailOrderModel detail = new()
            {
                do_cod_header = header.ho_code,
                do_iva = model.ho_iva == true ? 1:0,
                do_subtotal = model.ho_subtotal,
                do_total = model.ho_total,
            };

            detail = _detailOrderService.Save(detail);

            model.ho_items.ForEach(item =>
            {
                ItemDetailModel itemDetail = new()
                {
                    id_amount = item.ho_amount,
                    id_cod_detail = detail.do_code,
                    id_cod_item = item.ho_cod_item,
                    id_price = item.ho_price,
                    id_total = item.ho_total_item
                };

                itemDetail = _itemDetailService.Save(itemDetail); 
            });
        }


        public void UpdateDTO(OrderDTO model)
        {
            HeaderOrderModel header = new()
            {
                ho_code = model.ho_code,
                ho_cod_client = model.ho_cod_client,
                ho_date_registration = model.ho_date_registration,
                ho_state = model.ho_state,
            };

            header = this.Update(header);

            //DetailOrderModel detail = new()
            //{
            //    do_code = model.ho_cod_detail.Value,
            //    do_cod_header = header.ho_code,
            //    do_iva = model.ho_iva == true ? 1 : 0,
            //    do_subtotal = model.ho_subtotal,
            //    do_total = model.ho_total,
            //};

            //detail = _detailOrderService.Update(detail);

            //model.ho_items.ForEach(item =>
            //{
            //    ItemDetailModel itemDetail = new()
            //    {
            //        id_code = item.ho_code_i.Value,
            //        id_amount = item.ho_amount,
            //        id_cod_detail = detail.do_code,
            //        id_cod_item = item.ho_cod_item,
            //        id_price = item.ho_price,
            //        id_total = item.ho_total_item
            //    };

            //    itemDetail = item.ho_code_i != null ? _itemDetailService.Update(itemDetail) : _itemDetailService.Save(itemDetail);
            //});
        }


        public List<OrderDTO> GetAllDTO()
        {
            List<OrderDTO> response = [];
            List<HeaderOrderModel> list = this.GetAll();
            if(list.Count > 0)
            {
                list.ForEach(item => {
                    DetailOrderModel detailOrderModel = _detailOrderService.GetByHeard(item.ho_code);
                    ClientModel clientModel = _clientService.GetByPk(item.ho_cod_client);
                    StatusModel status = _statusService.GetByPk(item.ho_state);
                    List<ItemDetailModel> listDetails = _itemDetailService.GetByDetail(detailOrderModel.do_code);
                    List<ItemModel> listItems = listDetails.Count > 0 ? _itemService.GetByCodes(listDetails.Select(p => p.id_cod_item).ToList()): [];
                    response.Add(new OrderDTO().Transform(item, detailOrderModel, listDetails, clientModel, status, listItems));
                });
            }

            return response;
        }
    }
}
