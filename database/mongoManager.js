import mongoose from 'mongoose';

async function connectMongo() {
    const uri = 'mongodb+srv://dfernandezyopla:8FKGRmLIK7Lqsf8S@strv-test-project.ofvpj.mongodb.net/strv?retryWrites=true&w=majority&appName=STRV-test-project';
    await mongoose.connect(uri);
    console.log('Connection with MongoDB successful');
}

export default connectMongo;