import * as dotenv from 'dotenv';

dotenv.config();

const enviroment = {
  PORT: process.env.PORT,
};

const globalConfig = () => ({
  PORT: process.env.PORT,
});

export { enviroment, globalConfig };
