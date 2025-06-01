import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connection from './db/db.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'

connection();
const app =express();
app.use(express.json());

app.use(cors());
app.use('/api/auth',authRouter)
app.use(express.static('public/uploads'))

//app.use m upr prefix lgega jb b authrouter ko call krenge
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/setting',settingRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})

app.post('/api/test', (req, res) => {
  console.log("Test route hit with body:", req.body);
  res.json({ success: true, message: "Test route working", data: req.body });
});
