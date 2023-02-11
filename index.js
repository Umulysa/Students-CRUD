const express = require("express")
let students = [
    {
        id: 1,
        names: "nella",
        class: "year3"
    },
    {
        id: 2,
        names: "ornella",
        class: "year1"
    },
]


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/welcome", (req, res) => {
    res.send("welcome to our students API");
});
app.get("/get-students", (req, res) => {
    res.send(students);
});
app.post("/create-student", (req, res) => {
    let studentName = req.body.names;
    let studentClass = req.body.class;
    let studentId = students.length + 1;

    students.push({
        id: studentId,
        names: studentName,
        class: studentClass
    })

    res.send({ message:"student created successfully", data: students[studentId -1]})
})


app.put("/update-student/:id",(req,res)=>{
    const studentId= req.params.id;

    // for(i=0;i<students.length;i++){
    //     if(students[i].id==studentId){
    //         students[i].names= req.body.names;
    //         students[i].class=req.body.class
    //     }
    // }
    students.map(student=>{
        if(student.id==studentId){
            student.names=req.body.name;
            student.class=req.body.class
        }
    })
    res.send({message:"student updated successfully",data:students[studentId-1]});
})

app.delete("/delete-student/:id",(req,res)=>{
    const studentId=req.params.id;
    students=students.filter(student=>{
    return student.id!=studentId;
    })
    res.send({message:"student deleted successfully",students});
})

app.listen(3001, () => {
    console.log("server is running on port 3001...");
});

