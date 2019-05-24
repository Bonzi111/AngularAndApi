using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using WebApplication5Api.DataService;
using WebApplication5Api.Model;

namespace WebApplication5Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("AllowOrigin")]

    public class ValuesController : ControllerBase
    {
        [HttpGet(Name = "GetCategory")]
        public DataTable GetCategory()
        {
            DataTable dtCategory = new DataHelper().GetResults("SELECT * FROM CategoryMaster");
            return dtCategory;
        }
        [HttpGet(Name = "GetItemMaster")]
        public DataTable GetItemMaster()
        {
            DataTable dtItemMaster = new DataHelper().GetResults("SELECT * FROM ItemMaster");
            return dtItemMaster;
        }
        [HttpPost(Name = "SaveItemMaster")]
        public void SaveItemMaster([FromBody] ItemMaster data)
        {
            DataTable dtItemMaster = new DataHelper().PostValues("INSERT INTO ItemMaster VALUES ('" + data.ItemName + "' , '" + data.CategoryId + "')");
            return;
        }
        [HttpPost(Name = "SaveItemInventory")]
        public void SaveItemInventory([FromBody] ItemInventory data)
        {
            DataTable dtItemInventory = new DataHelper().PostValues("INSERT INTO ItemInventory Values('" + data.ItemQuantity + "','" + data.ItemRate + "','" + data.ItemId + "')");
            return;
        }
        [HttpGet(Name = "GetCustomer")]
        public DataTable GetCustomer()
        {
            DataTable dtUsers = new DataHelper().GetResults("SELECT * FROM CustomerData");
            return dtUsers;
        }
        [HttpPost(Name = "SaveCustomer")]
        public void SaveCustomer([FromBody] Customer data)
        {
            DataTable dtUsers = new DataHelper().PostValues("INSERT INTO CustomerData Values('" + data.CustomerName + "','" + data.CustomerEmail + "')");
            return;
        }
    }
}
