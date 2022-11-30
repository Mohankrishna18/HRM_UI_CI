import React, { useState, useEffect, useLayoutEffect } from "react";
import MaterialTable from "material-table";
import Grid from "@mui/material/Grid";
import axios from "../../../Uri";

export default function EditableDesignation() {
  const [data, setData] = useState([]);
  const [depname, setDepname] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios.get("/dept/getAllDepartments").then((res) => {
      console.log(res.data);
      setDepname(res.data);
    });
  }, []);
  console.log(depname);
  const loadDept = () => {
    // const status1 = [];
    depname.map((row) => {
      status[row.departmentName] = row.departmentName;
      //   status1[row.departmentId] = row.departmentName;
    });
    // console.log(status1);
    console.log(status);
    setStatus(status);
  };
  useEffect(() => {
    loadDept();
  });

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get("/designation/getAllDesignations");
    setData(res.data);
    console.log(res.data);
  };
  //   const myclick = (e) => {
  //     // console.log(rowData.departmentName)
  //     console.log(e);
  //     console.log("hai");
  //   };
  //   console.log("hai");

  //   var obj = depname.reduce(function (acc, cur, i) {
  //     acc[cur.departmentId] = cur.departmentName;
  //     return acc;
  //   }, {});

  const [columns, setColumns] = useState([
    // { title: 'ID', field: 'designationId', editable: false },
    {
      title: "Department",
      field: "departmentName",
      lookup: status,
      //   render: (rowData) => (
      //     <div onScroll={myclick}>{rowData.departmentName}</div>
      //  )

      headerStyle: {
        backgroundColor: "#f5896e",

        color: "white",
        // options: { obj },

        // onclick={(i)=>{
        //     setDepartmentId(i.target.dataset.value);
        //     console.log(i.target.dataset.value);
        //     console.log(i);
        // }}
      },
    },
    {
      title: "Designation Name",
      field: "designationName",
      headerStyle: {
        backgroundColor: "#f5896e",

        color: "white",
      },
    },
  ]);

  return (
    <Grid>
      <MaterialTable
        title=""
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(newData);
                const res = axios.post(
                  "/designation/postDesignationMaster",
                  newData
                );
                console.log(res);
                setData([...data, newData]);
                loadData();

                resolve();
              }, 1000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              console.log(oldRow);
              console.log(updatedRow);
              const index = oldRow.designationId;
              console.log(index);
              const updatedRows = [...data];
              console.log(updatedRows);
              updatedRows[oldRow.tableData.id] = updatedRow;
              console.log(updatedRows);

              setTimeout(() => {
                console.log(index);
                console.log(updatedRow);
                const res = axios
                  .put(`/designation/updateDesignations/${index}`, updatedRow)
                  .then((resp) => {
                    console.log(resp);
                    loadData();
                    setData(updatedRows);
                  })

                  .catch((err) => {
                    console.log("not updated");
                    // toast.error("Server error");
                  });

                setData(updatedRows);
                console.log("updated");
                // toast.success(" Updated Successfully");
                console.log(updatedRows);
                resolve();
              });
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(oldData);
                const dataDelete = [...data];
                const index = oldData.designationId;
                dataDelete.splice(index, 1);
                const res = axios
                  .delete(`/designation/deleteDesignation/${index}`)
                  .then((res) => {
                    console.log(res);
                    loadData();
                  });
                console.log(dataDelete);
                //setData(dataDelete);

                resolve();
              }, 1000);
            }),
        }}
        options={{
          paging: false,
          // paginationType:'normal',
          // pageSize:20,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#f5896e",
            color: "white",
            fontSize: "12px",
            //height: "10px",
            //fontWeight: 'bold'
        },
        rowStyle: {
            fontSize: 14,
        },
        }}
      />
    </Grid>
  );
}
