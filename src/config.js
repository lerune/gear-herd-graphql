const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connectionString = 'mongodb+srv://client:T9OEKGdWd4nj1n5c@gearherd-234bq.mongodb.net/test?retryWrites=true'

mongoose.connect(connectionString, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo`));