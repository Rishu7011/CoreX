import mongoose from 'mongoose';

const tempMessageSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ['user', 'assistant'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,

    }
});

const tempThreadSchema = new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type : String,
        default : "New Chat"
    },
    messages:[tempMessageSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model("tempThread",tempThreadSchema)