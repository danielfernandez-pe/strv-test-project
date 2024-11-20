import mongoose from 'mongoose';

async function connect() {
    const uri = 'mongodb+srv://dfernandezyopla:8FKGRmLIK7Lqsf8S@strv-test-project.ofvpj.mongodb.net/?retryWrites=true&w=majority&appName=STRV-test-project';
    await mongoose.connect(uri);
    console.log('Connection with MongoDB successful');
}

export default connect;