using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication5Api.Model
{
    public class ItemOrder
    {
        public int ItemId { get; set; }
        public int CustomerId { get; set; }
        public int ItemOrderQuantity { get; set; }
        public int TotalAmount { get; set; }
    }
}
