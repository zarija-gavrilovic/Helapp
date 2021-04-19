const express = require("express");
const app = express();
const routes = require("./routes");
const bodyparser = require("body-parser");
const mysql = require("mysql");

const cors = require("cors");

const PORT = process.env.PORT || 5000;
require("dotenv/config");

//https://www.youtube.com/watch?v=WfCJ3sHnLBM&t=837s
//DB CONNECTION
const db_connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: process.env.DATABASE,
  });
  
  db_connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + db_connection.threadId);
  });


//localhost
//http://192.168.0.21:5000/...

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(cors());

app.use("/", routes);



//LISTENER
app.listen(PORT, () => 
    console.log(`Listening on ${PORT}`)
);

//IP address
// const http = require("http");
// const options = {
//   host: "www.google.com",
// };
// const req = http.get(options);
// req.end();
// req.once("response", (res) => {
//   const ip = req.socket.localAddress;
//   const port = req.socket.localPort;
//   console.log(`Your IP address is ${ip} and your source port is ${port}.`);
//   // Consume response object
//   app.get("/ip", (req, res) => {
//     res.send(ip);
//   });
// });





// app.get('/ip/address', function (req1, res1) {
//     const http = require('http');
//     const options = {
//         host: 'www.google.com',
//     };
//     const req = http.get(options);
//     req.end();
//     req.once('response', (res) => {
//     const ip = req.socket.localAddress;
//     const port = req.socket.localPort;
//     console.log(`Your IP address is ${ip} and your source port is ${port}.`);
//     });

// });


app.get("/ip/address1", function (req1, res1) {
  res1.send("aaa");
});

//POST ROUTE
app.post("/addpatient", (req, res) => {
  const table = "patient";
  const name = req.body.name;
  const surname = req.body.surname;
  const image = req.body.image;
  const diagnosis = req.body.diagnosis;
  const review = req.body.review;

  console.log(req.body);

  db_connection.query(
    `insert into ${table} (name, surname,image, diagnosis, review) values ('${name}' , '${surname}','${image}', '${diagnosis}', '${review}')`,
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.affectedRows > 0) {
          console.log("successfully inserted.");

          //updated date: 29/8/2020
          // let res1 = app.get('/patients', (req,res) => {
          //     const table = 'patient';
          //     db_connection.connect(() => {
          const query = `SELECT patient_id , name, surname, image, diagnosis, review from ${table}`;
          db_connection.query(query, function (err, result, field) {
            if (err) {
              console.log(err);
            } else {
              let response = [];
              //------------------------------------------------------------------------------------------------------
              const query1 = `SELECT count(patient_id) as "number" from ${table} where review = 'CEKAONICA'`;
              db_connection.query(query1, function (err, result, field) {
                if (err) {
                  console.log(err);
                }
                console.log(JSON.stringify(result[0].number));
                response.push(result[0].number);
              });

              const query2 = `SELECT count(patient_id) as "number" from ${table} where review = 'HOSPITALIZACIJA'`;
              db_connection.query(query2, function (err, result, field) {
                if (err) {
                  console.log(err);
                }
                response.push(result[0].number);
              });

              const query3 = `SELECT count(patient_id) as "number" from ${table} where review = 'ZDRAV'`;
              db_connection.query(query3, function (err, result, field) {
                if (err) {
                  console.log(err);
                }
                response.push(result[0].number);
                // console.log('THIS IS A REPSONESE');
                // console.log(response);
                db_connection.query(
                  `INSERT INTO patient_total (waiting_room, in_process, healthy) values (${response[0]},${response[1]},${response[2]})`,
                  function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                      if (results.affectedRows > 0) {
                        console.log("successfully inserted snapshot!");

                        //res.status(200).send(response);
                      } else {
                        res.status(400).send("NO INSERTED ROWS");
                      }
                    }
                  }
                );
              });
              //----------------------------------------------------------------------------------------------------------
            }

            res.status(200).send(result);
            //res.status(200).send(JSON.stringify(result));
          });
        } else {
          res.status(400).send("NO INSERTED ROWS");
        }
      }
    }
  );
});

//PUT ROUTE
app.put("/updatepatientreview/:id", (req, res) => {
  const table = "patient";
  const patient_id = req.params.id;
  const review = req.body.review;
  const query = `UPDATE ${table} SET review= '${review}' where patient_id='${patient_id}'`;
  db_connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      if (results.affectedRows > 0) {
        console.log("successfully updated patient review.");
        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        let response = [];
        const query1 = `SELECT count(patient_id) as "number" from ${table} where review = 'CEKAONICA'`;
        db_connection.query(query1, function (err, result, field) {
          if (err) {
            console.log(err);
          }
          console.log(JSON.stringify(result[0].number));
          response.push(result[0].number);
        });

        const query2 = `SELECT count(patient_id) as "number" from ${table} where review = 'HOSPITALIZACIJA'`;
        db_connection.query(query2, function (err, result, field) {
          if (err) {
            console.log(err);
          }
          response.push(result[0].number);
        });

        const query3 = `SELECT count(patient_id) as "number" from ${table} where review = 'ZDRAV'`;
        db_connection.query(query3, function (err, result, field) {
          if (err) {
            console.log(err);
          }
          response.push(result[0].number);
          db_connection.query(
            `INSERT INTO patient_total (waiting_room, in_process, healthy) values (${response[0]},${response[1]},${response[2]})`,
            function (error, results, fields) {
              if (error) {
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  console.log("successfully inserted snapshot!");

                  //res.status(200).send(response);
                } else {
                  res.status(400).send("NO INSERTED ROWS");
                }
              }
            }
          );
        });

        res.send(req.params.id);
        //res.sendStatus(200);
      } else {
        //console.log("Number updated rows: " + results.affectedRows);
        res.sendStatus(400);
      }
    }
  });
});

//PUT ROUTE
app.put("/updatepatient/:id", (req, res) => {
  const table = "patient";
  const patient_id = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const image = req.body.image;
  const diagnosis = req.body.diagnosis;
  const review = req.body.review;
  const query = `UPDATE ${table} SET name='${name}', surname='${surname}', image= '${image}',diagnosis= '${diagnosis}',review= '${review}' where patient_id='${patient_id}'`;
  db_connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      if (results.affectedRows > 0) {
        console.log("successfully update.");
        res.send(req.params.id);
        //res.sendStatus(200);
      } else {
        //console.log("Number updated rows: " + results.affectedRows);
        res.sendStatus(400);
      }
    }
  });
});

//GET ukupnoStanje
app.get("/snapshot", (req, res) => {
  const table = "patient";
  let response = [];
  db_connection.connect(() => {
    const query1 = `SELECT count(patient_id) as "number" from ${table} where review = 'HOSPITALIZACIJA'`;
    db_connection.query(query1, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      console.log(JSON.stringify(result[0].number));
      response.push(result[0].number);
      //res.status(200).send(result);
      //res.status(200).send(JSON.stringify(result));
    });

    const query2 = `SELECT count(patient_id) as "number" from ${table} where review = 'ZDRAV'`;
    db_connection.query(query2, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      response.push(result[0].number);
      //res.status(200).send(result);
      //res.status(200).send(JSON.stringify(result));
    });

    const query3 = `SELECT count(patient_id) as "number" from ${table} where review = 'CEKAONICA'`;
    db_connection.query(query3, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      response.push(result[0].number);
      // db_connection.query(`INSERT INTO patient_total (waiting_room, in_process, healthy) values (${response[0]},${response[1]},${response[2]})`, function (error, results, fields){
      //     if (error) {
      //         throw error;
      //     } else {
      //         if(results.affectedRows > 0) {
      //             console.log("successfully inserted.");

      //             //res.status(200).send(response);
      //         } else {
      //             res.status(400).send('NO INSERTED ROWS');
      //         }
      //     }
      // })
      //res.status(200).send(JSON.stringify(result));
    });

    db_connection.query(
      "SELECT waiting_room, in_process, healthy FROM patient_total ORDER BY patient_totalID DESC LIMIT 8",
      function (err, result, field) {
        if (err) {
          console.log(err);
        }
        res.status(200).send(result);
      }
    );
  });
});

//POST ROUTE
app.post("/adddoctor", (req, res) => {
  const table = "doctor";
  const name = req.body.name;
  const surname = req.body.surname;
  const orientation = req.body.orientation;
  const image = req.body.image;
  const hospital = req.body.hospital;
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);

  db_connection.query(
    `insert into ${table} 
(name, surname, orientation, image, hospital, username, password) values ('${name}' , '${surname}','${orientation}', '${image}', '${hospital}', '${username}', '${password}')`,
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.affectedRows > 0) {
          console.log("successfully inserted.");
          res.status(200).send(req.body);
        } else {
          res.status(400).send("NO INSERTED ROWS");
        }
      }
    }
  );
});

//PUT ROUTE
app.put("/updatedoctor/:id", (req, res) => {
  const table = "doctor";
  const doctor_id = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const orientation = req.body.orientation;
  const image = req.body.image;
  const hospital = req.body.hospital;
  const username = req.body.username;
  const password = req.body.password;
  const query = `UPDATE ${table} SET name='${name}', surname='${surname}', orientation='${orientation}', image= '${image}', hospital='${hospital}', username='${username}', password='${password}' where doctor_id='${doctor_id}'`;
  db_connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      if (results.affectedRows > 0) {
        console.log("successfully update.");
        res.send(req.params.id);
        //res.sendStatus(200);
      } else {
        //console.log("Number updated rows: " + results.affectedRows);
        res.sendStatus(400);
      }
    }
  });
});

app.get("/deletepatient/:id", (req, res) => {
  // const name = req.params.name;
  // const surname = req.params.surname;
  // const diagnosis = req.params.diagnosis;
  // const review = req.params.review;
  const table = "patient";
  const patient_id = req.params.id;
  db_connection.connect(() => {
    const query = `DELETE FROM ${table} WHERE patient_id = ${patient_id}`;
    db_connection.query(query, function (err, result, field) {
      if (result.affectedRows > 0) {
        console.log("successfully deleted.");
        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        let response = [];
        const query1 = `SELECT count(patient_id) as "number" from ${table} where review = 'CEKAONICA'`;
        db_connection.query(query1, function (err, result, field) {
          if (err) {
            console.log(err);
          }
          console.log(JSON.stringify(result[0].number));
          response.push(result[0].number);
        });

        const query2 = `SELECT count(patient_id) as "number" from ${table} where review = 'HOSPITALIZACIJA'`;
        db_connection.query(query2, function (err, result, field) {
          if (err) {
            console.log(err);
          }
          response.push(result[0].number);
        });

        const query3 = `SELECT count(patient_id) as "number" from ${table} where review = 'ZDRAV'`;
        db_connection.query(query3, function (err, result, field) {
          if (err) {
            console.log(err);
          }
          response.push(result[0].number);
          db_connection.query(
            `INSERT INTO patient_total (waiting_room, in_process, healthy) values (${response[0]},${response[1]},${response[2]})`,
            function (error, results, fields) {
              if (error) {
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  console.log("successfully inserted snapshot!");

                  //res.status(200).send(response);
                } else {
                  res.status(400).send("NO INSERTED ROWS");
                }
              }
            }
          );
        });

        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        res.status(200).send(req.body);
      } else {
        res.status(400).send("NOT DELETED");
      }
    });
  });
});

//GET ROUTE
app.get("/patients", (req, res) => {
  const table = "patient";
  db_connection.connect(() => {
    const query = `SELECT patient_id , name, surname, image, diagnosis, review from ${table}`;
    db_connection.query(query, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result);
      //res.status(200).send(JSON.stringify(result));
    });
  });
});

//GET ROUTE
app.get("/doctors", (req, res) => {
  const table = "doctor";
  db_connection.connect(() => {
    const query = `SELECT doctor_id , name, surname, orientation, image, hospital, username, password from ${table}`;
    db_connection.query(query, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result);

      //res.status(200).send(JSON.stringify(result));
    });
  });
});

app.get("/doctor/:username/:password", (req, res) => {
  const table = "doctor";
  const username = req.params.username;
  const password = req.params.password;
  db_connection.connect(() => {
    const query = `SELECT doctor_id , name, surname, orientation, image, hospital, username, password from ${table} WHERE username='${username}' AND password = '${password}'`;
    db_connection.query(query, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      if (result[0] === undefined) {
        res.status(404).send("Not found!");
        console.log("Not found!");
      } else {
        res.status(200).send(result[0]);
        console.log(result[0]);
      }

      //res.status(200).send(JSON.stringify(result));
    });
  });
});

app.get("/pcategory/:string", (req, res) => {
  const table = "patient";
  const review = req.params.string;
  db_connection.connect(() => {
    const query = `SELECT patient_id , name, surname, image, diagnosis, review from ${table} WHERE review = '${review}'`;
    db_connection.query(query, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result);
      //res.status(200).send(JSON.stringify(result));
    });
  });
});

app.get("/patient/:id", (req, res) => {
  const table = "patient";
  const query = `SELECT patient_id , name, surname, image, diagnosis, review from ${table} where patient_id='${req.params.id}'`;
  db_connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("successfully returned.");
      //res.status(200).send(req.body);
      console.log(results[0]);
      res.send(results[0]);
    }
  });
});

//GET MAX(patient_id)
app.get("/getMaxPatientId", (req, res) => {
  const table = "patient";
  const query = `SELECT MAX(patient_id) as "maxid" FROM ${table}`;
  db_connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("successfully returned.");
      //res.status(200).send(req.body);
      //console.log(JSON.stringify(results[0]));
      //This return maxid like number: number
      //results[0].maxid
      res.send(results[0]);
    }
  });
});

//----------------------------LOGGER--------------------------

//GET loggerInfoList
app.get("/loginfolist", (req, res) => {
  const table = "logger";
  db_connection.connect(() => {
    const query = `SELECT info from ${table}`;
    db_connection.query(query, function (err, result, field) {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result);
      //res.status(200).send(JSON.stringify(result));
    });
  });
});

app.post("/addloginfo", (req, res) => {
  const table = "logger";
  const info = req.body.info;
  console.log("USPESNO UNETO" + info);
  db_connection.connect(() => {
    const query = `INSERT INTO ${table} (info) VALUES ('${info}')`;
    db_connection.query(query, function (err, result, field) {
      if (result.affectedRows > 0) {
        console.log("successfully inserted.");
        res.status(200).send(req.body);
      } else {
        res.status(400).send("NO INSERTED ROWS");
      }
    });
  });
});

/*
app.post('/insertjob', (req, res) => {
    const data = JSON.parse(req.body.data);
    const table = 'jobs';
    const jobClass = data.jobClass.jobClassID;
    const jobDescription = data.jobDescription;
    console.log('USPESNO UNETO' + jobClass + ' ' + jobDescription);
    db_connection.connect(() => {
        const query = `INSERT INTO jobs (jobclass, description) VALUES ('${jobClass}','${jobDescription}')`;
        db_connection.query(query, function(err, result, field){

        })
    })
})*/

/*
app.get('/selectjobs', (req,res) => {
    //const table = 'jobs';
    db_connection.connect(() => {
        const query = `SELECT j.ID as "jobID", jc.ID as "jobClassID", jc.Name as "jobClassName", j.description as "jobDescription" FROM jobs j INNER JOIN jobclass jc ON (j.jobclass = jc.ID)`;


        db_connection.query(query, function(err, result, field){
            let myResults = [];
            for (var i = 0; i< result.length; i++){
                //console.log(result[i]);
                myResult = {
                    jobID: result[i].jobID,
                    jobClass: {
                        jobClassID: result[i].jobClassID,
                        jobClassName: result[i].jobClassName,
                    },
                    jobDescription: result[i].jobDescription,
                }
                myResults.push(myResult);
            }
            console.log(myResults);
            if (err) {console.log(err);}
            res.send(JSON.stringify(myResults));
        })
    })
})
//NEW
app.get('/selectjobclass', (req,res) => {
    const table = 'jobclass';
    db_connection.connect(() => {
        const query = `SELECT ID as "jobClassID" , Name as "jobClassName" FROM ${table}`;
        db_connection.query(query, function(err, result, field){
            if (err) {console.log(err);}

            res.send(JSON.stringify(result));
        })
    })
})


app.get('/getworker/:id', (req,res) => {
    const table = 'workers';
    db_connection.connect(() => {
        console.log('OVO JE DOBIJEN ID ' + req.params.id);
        const query = `select workerID, workerName, workerPosition, workerSalary from workers where workerID='${req.params.id}'`;
        db_connection.query(query, function(err, result, field){
            console.log('OVO JE JEDAN WORKER OD GET'+JSON.stringify(result));
            if (err) { console.log(err); }
            res.send(JSON.stringify(result));
        })
    })
})

app.get('/selectjobworker', (req,res) => {
    const table = 'job_worker';
    db_connection.connect(() => {
        const query = `SELECT jw.ID,j.ID,j.jobclass,j.description,w.workerID, w.workerName, w.workerPosition, w.workerSalary FROM ${table} jw INNER JOIN jobs j ON (jw.job = j.ID) INNER JOIN workers w ON (jw.worker=w.workerID)`;
        db_connection.query(query, function(err, result, field){
            if (err) {console.log(err);}
            res.send(JSON.stringify(result));
            console.log(JSON.stringify(result)+'JOBCLASS');
        })
    })
})


-------------------------------------------------------
//POST ROUTE
app.post('/insertworker', (req, res) => {
    const data = JSON.parse(req.body.data);
    const table = 'workers';
    const workerName = data.workerName;
    const workerPosition = data.workerPosition;
    const workerSalary = data.workerSalary;
    db_connection.connect(() => {
        const query = `insert into ${table} (workerName, workerPosition,workerSalary) values ('${workerName}' , '${workerPosition}','${workerSalary}')`;
        db_connection.query(query, function(err, result, field){
            if(err){
                res.end(JSON.stringify(err));
                console.log("ERROR!"+err);
            }else{
                if(result.affectedRows > 0){
                    res.end("successfully inserted.");
                    console.log("GOOD1!");
                }else{
                    res.end("Please try again.");
                    console.log("BAD!");
                }
            }
        })
    })
})

app.post('/insertjob', (req, res) => {
    const data = JSON.parse(req.body.data);
    const table = 'jobs';
    const jobClass = data.jobClass.jobClassID;
    const jobDescription = data.jobDescription;
    console.log('USPESNO UNETO' + jobClass + ' ' + jobDescription);
    db_connection.connect(() => {
        const query = `INSERT INTO jobs (jobclass, description) VALUES ('${jobClass}','${jobDescription}')`;
        db_connection.query(query, function(err, result, field){

        })
    })
})



//PUT ROUTE
app.put('/updateworker/:id', (req, res) => {
    const data = JSON.parse(req.body.data);
    const table = 'workers';
    const workerName = data.workerName;
    const workerPosition = data.workerPosition;
    const workerSalary = data.workerSalary;
    db_connection.connect(() => {
        //const query = `insert into ${table} (workerName, workerPosition,workerSalary) values ('${workerName}' , '${workerPosition}','${workerSalary}')`;
        const query = `UPDATE ${table} SET workerName='${workerName}', workerPosition='${workerPosition}', workerSalary= '${workerSalary}' where workerID='${req.params.id}'`;
        db_connection.query(query, function(err, result, field){
            console.log('UPDATOVANOOOOOOOOOOOOo');
            if(err){
                res.end(JSON.stringify(err));
                console.log("ERROR!"+err);
            }else{
                if(result.affectedRows > 0){
                    res.end("successfully inserted.");
                    console.log("GOOD!"+result.affectedRows);
                }else{
                    res.end("Please try again.");
                    console.log("BAD!");
                }
            }
        })
    })
})

*/

