using Azure;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        SqlConnection con = new SqlConnection("Data Source=DESKTOP-6L5LV7C\\SQLEXPRESS;Initial Catalog=LabourHub;Integrated Security=True; Encrypt=false");

        [HttpPost("Registration")]
        public string Registration(UserClass user)
        {
            UserResponceMessageClass responce = new UserResponceMessageClass();

            string Id = Guid.NewGuid().ToString();

            SqlCommand cmd = new SqlCommand("INSERT INTO Users (UserId, Email, UserName, Password, Address, PhoneNumber, UserRole)" +
                "VALUES('" + Id + "', '" + user.Email + "', '" + user.UserName + "', '" + user.Password + "', '" + user.Address + "','" + user.PhoneNumber + "', '" + user.UserRole + "')", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                responce.Status = "200";
                responce.Message = "Successfully Login";
                responce.UserName = user.UserName;
                responce.Token = Id;
                responce.Role = user.UserRole;

                return JsonConvert.SerializeObject(responce);
            }

            else
            {
                responce.Status = "400";
                responce.Message = "User Connot Registration";

                return JsonConvert.SerializeObject(responce);
            }
        }

        [HttpPost("Login")]
        public string Login(LoginClass user)
        {
            UserResponceMessageClass responce = new UserResponceMessageClass();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Users WHERE Email = '" + user.Email + "' AND Password = '" + user.Password + "'", con);

            DataTable dt = new DataTable();

            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                responce.Status = "200";
                responce.Message = "Successfully Login";
                responce.Data = JsonConvert.SerializeObject(dt);

                return JsonConvert.SerializeObject(responce);
            }

            else
            {
                responce.Status = "400";
                responce.Message = "Invalid Cratatial";

                return JsonConvert.SerializeObject(responce);
            }
        }
    }
}
