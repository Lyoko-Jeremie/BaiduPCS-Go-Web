import express from "express";
import app from "./appInit";

import api from "./routes/api";
import index from "./routes/index";

app.use('/pages', express.static('./public/index.html'));
app.use('/', index);
app.use('/api', api);

export default app;
