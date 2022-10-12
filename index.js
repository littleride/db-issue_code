const useRoutes = require("./routes/student_registration.js");
const useRoutesCorp = require("./routes/corp_data.js");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/users', useRoutes);
app.use('/corp-users', useRoutesCorp);

const corsOptions = {
   origin: '*',
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => res.send("Hello from Home Page"));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
