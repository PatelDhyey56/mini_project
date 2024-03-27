var router = require("express").Router();
var con = require("../services/database");

router.get("/", (req, res) => {
  con.con.query(
    "select count(*) as total_row from Student_master",
    function (err, result, fields) {
      if (err) {
        res.render("error_page");
      } else {
        var query = require("url").parse(req.url, true).query;
        let page = Number(query.page) || 1;
        let data = query.data || 20;
        let month = query.month || 1;
        var last_page = Math.ceil(result[0].total_row / data);
        if (page <= last_page) {
          let page_start_index = (page - 1) * data;
          let query1 = `SELECT Student_master.Student_ID, First_name,Last_name, count(Student_master.Student_ID) as "PRESENT_DAYS" ,ROUND(COUNT(Student_master.Student_ID)/.3,2) AS "PERCENTAGE" FROM Student_master left join Attendance on Student_master.Student_ID=Attendance.Student_ID where Attendance.Month_ID=${month}  AND Attendance.Attendance="P" Group By Attendance.Student_ID  order By Attendance.Student_ID limit ${data} offset ${page_start_index};`;
          con.con.query(query1, function (err, result1, fields) {
            if (err) {
              res.render("error_page");
            } else {
              res.render("student/student_attendance", {
                table_heder: fields,
                data: result1,
                page,
                month,
                last_page,
              });
            }
          });
        } else {
          res.render("error_page");
        }
      }
    }
  );
});

router.get("/result", (req, res) => {
  con.con.query(
    "select count(*) as total_row from Student_master",
    function (err, result, fields) {
      if (err) {
        console.log("error in data");
      } else {
        var query = require("url").parse(req.url, true).query;
        let page = Number(query.page) || 1;
        let data = query.data || 100;
        var last_page = Math.ceil(result[0].total_row / data);

        if (page <= last_page) {
          let page_start_index = (page - 1) * data;

          let query2 = `SELECT Student_master.Student_ID,Student_master.First_name, sum(case when Exam_type_ID ="1" then Theory_marks else 0 end) as Terminal_Theory_marks ,sum(case when Exam_type_ID ="1" then Practical_marks else 0 end) as Terminal_Practical_marks ,sum(case when Exam_type_ID ="2" then Theory_marks else 0 end) as Prelims_Theory_marks ,sum(case when Exam_type_ID ="2" then Practical_marks else 0 end) as Prelims_Practical_marks ,sum(case when Exam_type_ID ="3" then Theory_marks else 0 end) as Final_Theory_marks ,sum(case when Exam_type_ID ="3" then Practical_marks else 0 end) as Final_Practical_marks ,sum(Theory_marks+Practical_marks) as Total_marks  from Exam left join Student_master on Student_master.Student_ID=Exam.Student_ID Group by Student_master.Student_ID limit ${data} offset ${page_start_index};`;

          con.con.query(query2, function (err, result, fields) {
            if (err) {
              console.log("error in data");
            } else {
              res.render("student/student_result", {
                table_heder: fields,
                data: result,
                page,
                last_page,
              });
            }
          });
        } else {
          res.render("error_page");
          res.end();
        }
      }
    }
  );
});
router.get("/result/report/:ID/:Total_marks", (req, res) => {
  let id = Number(req.params["ID"]);
  let total_marks = Number(req.params["Total_marks"]);
  con.con.query(
    `SELECT Student_master.Student_ID, First_name,Last_name, count(Student_master.Student_ID) as "PRESENT_DAYS" ,ROUND(COUNT(Student_master.Student_ID)/.93,2) AS "PERCENTAGE"
    FROM Student_master 
    left join Attendance on Student_master.Student_ID=Attendance.Student_ID 
    where Attendance.Attendance="P"
   And Student_master.Student_ID =${id};`,
    function (err, result, fields) {
      if (err) {
        console.log("error in data");
        res.end();
      } else {
        let student = result[0];
        let sql3 = `select Subject_master.Subject_ID,Subject_name,
        sum(case when Exam.Exam_type_ID ="1" then Theory_marks else 0 end) as Terminal_Theory_marks ,
        sum(case when Exam.Exam_type_ID ="1" then Practical_marks else 0 end) as Terminal_Practical_marks ,
        sum(case when Exam.Exam_type_ID ="2" then Theory_marks else 0 end) as Prelims_Theory_marks ,
        sum(case when Exam.Exam_type_ID  ="2" then Practical_marks else 0 end) as Prelims_Practical_marks ,
        sum(case when Exam.Exam_type_ID ="3" then Theory_marks else 0 end) as Final_Theory_marks  ,
        sum(case when Exam.Exam_type_ID ="3" then Practical_marks else 0 end) as Final_Practical_marks ,
        sum(Practical_marks + Practical_marks ) as total_marks
        from Exam 
        left join Subject_master on Subject_master.Subject_ID=Exam.Subject_ID 
        left join Exam_master on Exam_master.Exam_type_ID=Exam.Exam_type_ID
        where Student_ID =${id} group by Subject_master.Subject_ID;`;
        con.con.query(sql3, function (err, result, fields) {
          if (err) {
            console.log("error in data");
          } else {
            res.render("student/Student_details", {
              table_heder: fields,
              student,
              total_marks,
              data: result,
            });
          }
        });
      }
    }
  );
});
module.exports = router;
