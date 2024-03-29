var con = require("../services/database");

const get_ajax_page = (req, res) => {
  res.render("job_application_form/ajax_job_application.ejs", {
    result: false,
  });
};
const post_ajex_update = (req, res) => {
  var data = req.body;
  console.log(req.body);

  try {
    let sql1 = `INSERT INTO JOB_APPLICATION_FORM (F_NAME, L_NAME, ADDRESS_1, EMAIL, PHONE_NO, CITY_NAME,CITY_CODE, GENDER, RELATIONSHIP, DOB,Designation) VALUES ("${data.f_name}","${data.l_name}", "${data.address}","${data.email}", "${data.Mobile_no}", "${data.city}", "${data.zip_code}", "${data.gender}", "${data.relationship}", "${data.dob}","${data.designation}");`;

    con.con.query(sql1, function (err, result, fields) {
      let errordata = false;
      if (err) {
        errordata = true;
        // console.log(err);
      } else {
        console.log(`1 record in basic_details inserted...`);
        // let id = "1";
        let id = result.insertId || "1";
        console.log(id);
        const data_insert = (sql, table) => {
          con.con.query(sql, function (err, result, fields) {
            if (err) {
              errordata = true;
              // throw err;
              // console.log(err);
            }
            console.log(`1 record in ${table} inserted...`);
          });
        };
        // education
        let ssc = `INSERT EDUCATION (INDEX_NO, EDUCATION_TYPE, BORD_NAME , PASS_YEAR, PERCENTAGE) VALUES (${id}, "ssc","${data.name_of_bord_ssc}", "${data.passing_year_ssc}", "${data.Percentage_ssc}")`;
        let hsc = `INSERT EDUCATION (INDEX_NO, EDUCATION_TYPE, BORD_NAME , PASS_YEAR, PERCENTAGE) VALUES (${id}, "hsc","${data.name_of_bord_hsc}", "${data.passing_year_hsc}", "${data.Percentage_hsc}")`;
        let bachlar = `INSERT EDUCATION (INDEX_NO, EDUCATION_TYPE, BORD_NAME , PASS_YEAR, PERCENTAGE) VALUES (${id}, "bachlar","${data.name_of_bord_bachlar}", "${data.passing_year_bachlar}", "${data.Percentage_bachlar}")`;
        let master = `INSERT EDUCATION (INDEX_NO, EDUCATION_TYPE, BORD_NAME , PASS_YEAR, PERCENTAGE) VALUES (${id}, "hsc","${data.name_of_bord_master}", "${data.passing_year_master}", "${data.Percentage_master}")`;

        // console.log(ssc);
        data_insert(ssc, "education_scc");
        data_insert(hsc, "education_hcc");
        data_insert(bachlar, "education_bachlar");
        data_insert(master, "education_master");

        // lenguage
        if (data.gujrati || data.hindi || data.english) {
          if (data.gujrati == "on") {
            if (data.GUJRATI.length > 3) {
              let gujrati = `INSERT INTO KNOWN_LANGUAGE (INDEX_NO, LANGUAGE_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "gujrati", "${data.GUJRATI}");`;
              data_insert(gujrati, `Gujrati`);
            } else {
              // console.log();
              for (let i = 0; i < data.GUJRATI.length; i++) {
                let gujrati = `INSERT INTO KNOWN_LANGUAGE (INDEX_NO, LANGUAGE_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "gujrati", "${data.GUJRATI[i]}");`;
                data_insert(gujrati, `Gujrati ${i}`);
              }
            }
          }
          if (data.hindi == "on") {
            if (data.HINDI.length > 3) {
              let gujrati = `INSERT INTO KNOWN_LANGUAGE (INDEX_NO, LANGUAGE_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "hindi", "${data.HINDI}");`;
              data_insert(gujrati, `HINDI`);
            } else {
              // console.log();
              for (let i = 0; i < data.HINDI.length; i++) {
                let gujrati = `INSERT INTO KNOWN_LANGUAGE (INDEX_NO, LANGUAGE_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "hindi", "${data.HINDI[i]}");`;
                data_insert(gujrati, `HINDI ${i}`);
              }
            }
          }
          if (data.english == "on") {
            if (data.ENGLISH.length > 3) {
              let gujrati = `INSERT INTO KNOWN_LANGUAGE (INDEX_NO, LANGUAGE_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "english", "${data.ENGLISH}");`;
              data_insert(gujrati, `ENGLISH`);
            } else {
              // console.log();
              for (let i = 0; i < data.ENGLISH.length; i++) {
                let gujrati = `INSERT INTO KNOWN_LANGUAGE (INDEX_NO, LANGUAGE_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "english", "${data.ENGLISH[i]}");`;
                data_insert(gujrati, `ENGLISH ${i}`);
              }
            }
          }
        }

        // technology
        if (data["C#"]) {
          let c = `INSERT INTO KNOWN_TECHNOLOGIES (INDEX_NO, TECHNOLOGY_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "c#", "${data["C#"]}");`;
          data_insert(c, `c `);
        }
        if (data["C++"]) {
          let c = `INSERT INTO KNOWN_TECHNOLOGIES (INDEX_NO, TECHNOLOGY_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "c++", "${data["C++"]}");`;
          data_insert(c, `c++ `);
        }
        if (data["JAVA"]) {
          let c = `INSERT INTO KNOWN_TECHNOLOGIES (INDEX_NO, TECHNOLOGY_NAME, LAVEL_EXPERIENCE) VALUES (${id}, "java", "${data["JAVA"]}");`;
          data_insert(c, `JAVA`);
        }

        // preferances
        let preferances = `INSERT INTO PREFERANCES (INDEX_NO, LOCATION_NAME, NOTICE_TIME,EXPECTED_CTC,CURRENT_CTC,DEPARTMENT) VALUES (${id},"${data.prefer_locations}","${data.notice_time}","${data.expected_ctc}","${data.current_ctc}","${data.Department}");`;
        // console.log(preferances);
        data_insert(preferances, `preferances`);

        // companys
        for (i = 0; i < data["company_name"].length; i = i + 4) {
          if (data["company_name"][i].length > 0) {
            // console.log(data["company_name"][i]);
            let company = `INSERT INTO WORK_EXPERIENCE (INDEX_NO, COMPANY_NAME,DESIGNATION,FORM,LAST_DATE_OF_COMPANY) VALUES (${id},"${
              data["company_name"][i]
            }","${data["company_name"][Number(i) + 1]}","${
              data["company_name"][Number(i) + 2]
            }","${data["company_name"][Number(i) + 3]}");`;
            data_insert(company, `company ${i}`);
          }
        }
        // referances
        for (i = 0; i < data["contect_name"].length; i = i + 3) {
          if (data["contect_name"][i].length > 0) {
            // console.log(data[i][0]);
            let q = `INSERT INTO REFERANCE_CONTACT (INDEX_NO, NAME_OF_PERSON,CONTECT_NO,RELATION) VALUES (${id},"${
              data["contect_name"][i]
            }","${data["contect_name"][Number(i) + 1]}","${
              data["contect_name"][Number(i) + 2]
            }");`;
            data_insert(q, `contect ${i}`);
          }
        }
      }
      if (errordata == true) {
        res.status(400);
        res.send("<h1>Enter valid Data...</h1>");
      } else {
        res.send("<h1>Data recived...</h1>");
      }
    });
  } catch (e) {
    res.status(400);
    res.send("<h1>Data not recived...</h1>");
    console.log(e);
  }
};

const getid_ajex = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    const sqlrun = (sql) => {
      return new Promise((resolve, reject) => {
        con.con.query(sql, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    };
    let sql = `SELECT * FROM JOB_APPLICATION_FORM where INDEX_NO =${id};`;
    let sql2 = `SELECT * FROM EDUCATION where INDEX_NO =${id}`;
    let sql3 = `SELECT * FROM WORK_EXPERIENCE where INDEX_NO =${id}`;
    let sql4 = `SELECT * FROM REFERANCE_CONTACT where INDEX_NO =${id}`;
    let sql5 = `SELECT * FROM PREFERANCES where INDEX_NO =${id}`;
    let sql6 = `SELECT * FROM KNOWN_LANGUAGE where INDEX_NO =${id}`;
    let sql7 = `SELECT * FROM KNOWN_TECHNOLOGIES where INDEX_NO =${id}`;
    var obj = {
      data1: await sqlrun(sql),
      data2: await sqlrun(sql2),
      data3: await sqlrun(sql3),
      data4: await sqlrun(sql4),
      data5: await sqlrun(sql5),
      data6: await sqlrun(sql6),
      data7: await sqlrun(sql7),
    };
    // console.log(obj.data1[0]);
    if (obj.data1[0]) {
      res.render("job_application_form/ajax_job_application", {
        result: true,
        id,
        resultdata1: obj.data1[0],
        resultdata2: obj.data2,
        resultdata3: obj.data3,
        resultdata4: obj.data4,
        resultdata5: obj.data5[0],
        resultdata6: obj.data6,
        resultdata7: obj.data7,
      });
      // res.send(obj);
    } else {
      res.send("<h1>Enter valid id...</h1>");
    }
  } catch (e) {
    res.render("error_page");
    console.log(e);
  }
};
const postid_ajex = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log(data);
  try {
    let errordata = false;
    console.log(data);
    const sqlfunc = (sql, table) => {
      con.con.query(sql, function (err, result, fields) {
        if (err) {
          errordata = true;
          throw err;
        }
        console.log(`1 record Updated at ${table}...`);
      });
    };
    let sql1 = `UPDATE JOB_APPLICATION_FORM SET F_NAME ="${data.f_name}", L_NAME="${data.l_name}", ADDRESS_1="${data.address}", EMAIL="${data.email}", PHONE_NO="${data.Mobile_no}", CITY_NAME="${data.city}",CITY_CODE="${data.zip_code}", GENDER="${data.gender}", RELATIONSHIP="${data.relationship}", DOB="${data.dob}" WHERE  INDEX_NO =${id} `;

    sqlfunc(sql1, "Basic table");

    // education
    let ssc = `UPDATE EDUCATION SET BORD_NAME="${data.name_of_bord_ssc}" , PASS_YEAR="${data.passing_year_ssc}", PERCENTAGE="${data.Percentage_ssc}" WHERE  INDEX_NO =${id} and EDUCATION_TYPE="ssc"`;
    let hsc = `UPDATE EDUCATION SET BORD_NAME="${data.name_of_bord_hsc}" , PASS_YEAR="${data.passing_year_hsc}", PERCENTAGE="${data.Percentage_hsc}" WHERE  INDEX_NO =${id} and EDUCATION_TYPE="hsc"`;
    let bachlar = `UPDATE EDUCATION SET BORD_NAME="${data.name_of_bord_bachlar}" , PASS_YEAR="${data.passing_year_bachlar}", PERCENTAGE="${data.Percentage_bachlar}" WHERE  INDEX_NO =${id} and EDUCATION_TYPE="bachlar"`;
    let master = `UPDATE EDUCATION SET BORD_NAME="${data.name_of_bord_master}" , PASS_YEAR="${data.passing_year_master}", PERCENTAGE="${data.Percentage_master}" WHERE  INDEX_NO =${id} and EDUCATION_TYPE= "master"`;

    sqlfunc(ssc, "education_scc");
    sqlfunc(hsc, "education_hcc");
    sqlfunc(bachlar, "education_bachlar");
    sqlfunc(master, "education_master");

    // lenguage
    if (data.gujrati || data.hindi || data.english) {
      if (data.gujrati == "on") {
        if (data.GUJRATI.length > 3) {
          let gujrati = ` UPDATE KNOWN_LANGUAGE SET LAVEL_EXPERIENCE= "${data.GUJRATI}" WHERE  INDEX_NO =${id} and LANGUAGE_NAME="gujrati";`;
          sqlfunc(gujrati, `Gujrati`);
        } else {
          // console.log();
          for (let i = 0; i < data.GUJRATI.length; i++) {
            let gujrati = ` UPDATE KNOWN_LANGUAGE SET LAVEL_EXPERIENCE= "${data.GUJRATI[i]}" WHERE  INDEX_NO =${id} and LANGUAGE_NAME="gujrati";`;
            sqlfunc(gujrati, `GUJRATI ${i}`);
          }
        }
      }
      if (data.hindi == "on") {
        if (data.HINDI.length > 3) {
          let hindi = ` UPDATE KNOWN_LANGUAGE SET LAVEL_EXPERIENCE= "${data.HINDI}" WHERE  INDEX_NO =${id} and LANGUAGE_NAME="hindi";`;
          sqlfunc(hindi, `hindi`);
        } else {
          // console.log();
          for (let i = 0; i < data.HINDI.length; i++) {
            let hindi = ` UPDATE KNOWN_LANGUAGE SET LAVEL_EXPERIENCE= "${data.HINDI[i]}" WHERE  INDEX_NO =${id} and LANGUAGE_NAME="hindi";`;
            sqlfunc(hindi, `HINDI ${i}`);
          }
        }
      }
      if (data.english == "on") {
        if (data.ENGLISH.length > 3) {
          let english = ` UPDATE KNOWN_LANGUAGE SET LAVEL_EXPERIENCE= "${data.ENGLISH}" WHERE  INDEX_NO =${id} and LANGUAGE_NAME="english";`;
          sqlfunc(english, `english`);
        } else {
          // console.log();
          let english = ` UPDATE KNOWN_LANGUAGE SET LAVEL_EXPERIENCE= "${data.ENGLISH[i]}" WHERE  INDEX_NO =${id} and LANGUAGE_NAME="english";`;
          sqlfunc(english, `ENGLISH ${i}`);
        }
      }
    }

    // technology
    if (data["C#"]) {
      let c = `UPDATE KNOWN_TECHNOLOGIES SET LAVEL_EXPERIENCE= "${data["C#"]}" WHERE  INDEX_NO =${id} and TECHNOLOGY_NAME="c#";`;
      sqlfunc(c, `c#`);
    }
    if (data["C++"]) {
      let c = `UPDATE KNOWN_TECHNOLOGIES SET LAVEL_EXPERIENCE= "${data["C++"]}" WHERE  INDEX_NO =${id} and TECHNOLOGY_NAME="c++";`;
      sqlfunc(c, `c++ `);
    }
    if (data["JAVA"]) {
      let java = `UPDATE KNOWN_TECHNOLOGIES SET LAVEL_EXPERIENCE= "${data["JAVA"]}" WHERE  INDEX_NO =${id} and TECHNOLOGY_NAME="java";`;
      sqlfunc(java, `JAVA`);
    }

    // preferances
    let preferances = `UPDATE PREFERANCES SET LOCATION_NAME="${data.prefer_locations}", NOTICE_TIME="${data.notice_time}",EXPECTED_CTC="${data.expected_ctc}",CURRENT_CTC="${data.current_ctc}",DEPARTMENT="${data.Department}" WHERE INDEX_NO="${id}";`;
    sqlfunc(preferances, `preferances`);

    // companys
    for (i = 0; i < data["company_name"].length; i = i + 4) {
      if (data["company_name"][i].length > 0) {
        // console.log(data["company_name"][i]);
        let company = `UPDATE WORK_EXPERIENCE 
          SET COMPANY_NAME="${data["company_name"][i]}",DESIGNATION="${
          data["company_name"][Number(i) + 1]
        }",FORM="${data["company_name"][Number(i) + 2]}",TO_DATE="${
          data["company_name"][Number(i) + 3]
        }"" WHERE INDEX_NO="${id}" and COMPANY_ID="1";`;
        sqlfunc(company, `company ${i}`);
      }
    }

    // referances
    for (i = 0; i < data["contect_name"].length; i = i + 3) {
      if (data["contect_name"][i].length > 0) {
        // console.log(data[i][0]);
        let q = `UPDATE REFERANCE_CONTACT SET NAME_OF_PERSON="${
          data["contect_name"][i]
        }",CONTECT_NO="${data["contect_name"][Number(i) + 1]}",RELATION"${
          data["contect_name"][Number(i) + 2]
        }" WHERE INDEX_NO="${id}" and REFER_INDEX="1";`;
        sqlfunc(q, `contect ${i}`);
      }
    }

    // console.log(ssc);
    if (errordata == true) {
      res.send("<h1>Enter valid Data...</h1>");
    } else {
      res.send("<h1>Data Updated...</h1>");
    }
  } catch (e) {
    res.render("error_page");
    console.log(e);
  }
};
const getstate = (req, res) => {
  let sql1 = `SELECT * FROM all_states;`;
  con.con.query(sql1, function (err, result, fields) {
    let errordata = false;
    if (err) {
      errordata = true;
      // console.log(err);
    } else {
      console.log(`state : ${result.length}`);
      res.end(JSON.stringify(result));
    }
  });
};
const getcity = (req, res) => {
  let sql1 = `SELECT * FROM all_cities;`;
  con.con.query(sql1, function (err, result, fields) {
    let errordata = false;
    if (err) {
      errordata = true;
      // console.log(err);
    } else {
      console.log(`city : ${result.length}`);
      res.end(JSON.stringify(result));
    }
  });
};
const getcity_by_state = (req, res) => {
  let sql1 = ` SELECT state_code FROM all_states where state_name="${req.params.state}"`;
  con.con.query(sql1, function (err, result, fields) {
    let errordata = false;
    if (err) {
      errordata = true;
      // console.log(err);
    } else {
      let state = Number(result[0].state_code);
      let sql2 = `SELECT * FROM all_cities where state_code=${state};`;
      con.con.query(sql2, function (err, result1, fields) {
        let errordata = false;
        if (err) {
          errordata = true;
          // console.log(err);
        } else {
          // console.log(result1);
          // console.log(result1.length);
          res.end(JSON.stringify(result1));
        }
      });
    }
  });
};
module.exports = {
  get_ajax_page,
  post_ajex_update,
  getid_ajex,
  postid_ajex,
  getstate,
  getcity,
  getcity_by_state,
};
