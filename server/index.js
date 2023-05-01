import app from './app.js'

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});