import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid'
import axios from "../../../Uri";


export default function EmploymentTypes() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await axios.get("/employmentType/getAllEmployments");
        setData(res.data.data);
        console.log(res.data.data);
    };

    const [columns, setColumns] = useState([
        { title: 'Employment Type', field: 'employmentTypeName' },
    ]);

    return (
        <Grid>
            <MaterialTable
                title=""
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(async () => {
                                console.log(newData)
                                 await axios.post("/employmentType/addEmploymentType",
                                    newData,
                                ).then(res => toast.success(res.data.message) )
                                .catch(e => toast.error(e.response.data.message))
                                //console.log(res.data)
                                // setData([...data, newData]);
                                //toast.success("Employment Type is added")
                                loadData();
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (updatedRow, oldRow) =>
                        new Promise((resolve, reject) => {
                            console.log(oldRow);
                            console.log(updatedRow);
                            const index = oldRow.employmentTypeId;
                            console.log(index);
                            const updatedRows = [...data];
                            console.log(updatedRows);
                            updatedRows[oldRow.tableData.id] = updatedRow;
                            console.log(updatedRows);
                            setTimeout(() => {
                                console.log(updatedRow)
                                const res = axios.put(`/employmentType/updateEmploymentTypeById/${index}`, updatedRow)
                                    .then((resp) => {
                                        console.log(resp);
                                        loadData()
                                    })
                                    .catch((err) => {
                                        console.log("not updated")
                                        // toast.error("Server error");
                                    });
                                setData(updatedRows);
                                console.log("updated")
                                toast.success("Employment Type is Updated")
                                console.log(updatedRows);
                                resolve();
                            });
                        }),

                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log(oldData)
                                const dataDelete = [...data];
                                const index = oldData.employmentTypeId;
                                dataDelete.splice(index, 1);
                                const res = axios.delete(`/employmentType/deleteEmploymentType/${index}`)
                                    .then((res) => {
                                        console.log(res)
                                        loadData()
                                    })
                                console.log(dataDelete)
                                //setData(dataDelete);
                                toast.success("Employment Type is deleted successfully")


                                resolve()
                            }, 1000)
                        }),
                }}
                options={{
                    pageSize: 5,
                    pageSizeOptions: [5,10, 15,20, 30 ,50, 75, 100 ],
                    maxBodyHeight: 450,
                    addRowPosition: 'first',
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
    )
}