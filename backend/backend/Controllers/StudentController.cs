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
    public class StudentController : ControllerBase
    {

        SqlConnection con = new SqlConnection("Data Source=DESKTOP-6L5LV7C\\SQLEXPRESS;Initial Catalog=LabourHub;Integrated Security=True; Encrypt=false");


        [HttpGet("GetStudent")]

        public string GetStudent()
        {
            StudentResponceMessageClass responce = new StudentResponceMessageClass();

            SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM Students", con);

            DataTable dt = new DataTable();

            adapter.Fill(dt);

            List<GetStudentClass> studentList = new List<GetStudentClass>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    GetStudentClass getStudent = new GetStudentClass();
                    getStudent.StudentID = Convert.ToString(dt.Rows[i]["StudentID"]);
                    getStudent.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    getStudent.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    getStudent.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    getStudent.PhoneNumber = Convert.ToString(dt.Rows[i]["PhoneNumber"]);
                    getStudent.UserID = Convert.ToString(dt.Rows[i]["UserID"]);
                    studentList.Add(getStudent);
                }

                if (studentList.Count > 0)
                {
                    responce.Status = "200";
                    responce.Data = JsonConvert.SerializeObject(studentList);
                    return JsonConvert.SerializeObject(responce);
                }

                else
                {
                    return JsonConvert.SerializeObject("No data Found");
                }
            }

            else
            {
                return "No data Found";
            }
        }

        [HttpGet("GetOneStudent/{id}")]
        public string GetOneStudent(string id)
        {
            StudentResponceMessageClass responce = new StudentResponceMessageClass();

            SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM Students WHERE UserID = '"+id+"'", con);

            DataTable dt = new DataTable();

            adapter.Fill(dt);

            List<GetStudentClass> studentList = new List<GetStudentClass>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    GetStudentClass getStudent = new GetStudentClass();
                    getStudent.StudentID = Convert.ToString(dt.Rows[i]["StudentID"]);
                    getStudent.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    getStudent.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    getStudent.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    getStudent.PhoneNumber = Convert.ToString(dt.Rows[i]["PhoneNumber"]);
                    getStudent.UserID = Convert.ToString(dt.Rows[i]["UserID"]);
                    studentList.Add(getStudent);
                }

                if (studentList.Count > 0)
                {
                    responce.Status = "200";
                    responce.Data = JsonConvert.SerializeObject(studentList);
                    return JsonConvert.SerializeObject(responce);
                }

                else
                {
                    return JsonConvert.SerializeObject("No data Found");
                }
            }

            else
            {
                return "No data Found";
            }
        }

        [HttpPost("InsertStudent")]

        public string PostStudent(StudentClass student)
        {
            StudentResponceMessageClass responce = new StudentResponceMessageClass();
            string Id = Guid.NewGuid().ToString();

            SqlCommand cmd = new SqlCommand("INSERT INTO Students (StudentID, FirstName, LastName, Email, PhoneNumber, UserID)" +
                "VALUES('" + Id + "', '" + student.FirstName + "', '" + student.LastName + "', '" + student.Email + "', '" + student.PhoneNumber + "', '" + student.UserID + "')", con);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                responce.Status = "200";
                responce.Message = "Successfully Inserted Data";

                return JsonConvert.SerializeObject(responce);
            }

            else
            {
                responce.Status = "400";
                responce.Message = "Student Connot Inserted";

                return JsonConvert.SerializeObject(responce);
            }
        }

        [HttpGet("FindUser/{id}")]

        public string GetStudentCount(string id)
        {
            StudentResponceMessageClass responce = new StudentResponceMessageClass();

            SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM Students WHERE StudentID = '" + id + "'", con);

            DataTable dt = new DataTable();

            adapter.Fill(dt);
            List<GetStudentClass> studentEditList = new List<GetStudentClass>();

            if (dt.Rows.Count > 0)
            {
                responce.Data = JsonConvert.SerializeObject(dt);
                responce.Status = "200";

                return JsonConvert.SerializeObject(responce);
            }

            else
            {
                responce.Status = "404";

                return JsonConvert.SerializeObject(responce);
            }
        }


        [HttpPut("UpdateStudent/{id}")]
        public string PutStudent(string id,  StudentClass student)
        {
            StudentResponceMessageClass responce = new StudentResponceMessageClass();

            SqlCommand cmd = new SqlCommand("UPDATE Students SET FirstName = '" + student.FirstName + "', LastName = '" + student.LastName + "', " +
                "Email = '" + student.Email + "', PhoneNumber = '" + student.PhoneNumber + "' WHERE StudentID = '" + id + "'", con);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                responce.Status = "200";
                responce.Message = "Successfully Updated Data";

                return JsonConvert.SerializeObject(responce);
            }

            else
            {
                responce.Status = "400";
                responce.Message = "Student Connot Updated";

                return JsonConvert.SerializeObject(responce);
            }
        }

        [HttpDelete("DeleteStudent/{id}")]
        public string DeleteStudent(string id)
        {
            StudentResponceMessageClass responce = new StudentResponceMessageClass();
            SqlCommand cmd = new SqlCommand("DELETE FROM Students WHERE StudentID = '" + id + "'", con);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                responce.Status = "200";
                responce.Message = "Student Deleted Successfukky";

                return JsonConvert.SerializeObject(responce);
            }

            else
            {
                responce.Status = "400";
                responce.Message = "No Data Found";

                return JsonConvert.SerializeObject(responce);
            }
        }

    }
}
