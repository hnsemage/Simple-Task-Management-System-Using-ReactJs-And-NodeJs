const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskId: { type: Number, unique: true },
    taskName: { type: String, required: true },
    description: { type: String },
    username: { type: String, required: true },
    startDate: { type: String },
    endDate: { type: String },
    taskStatus: { type: String, required: true, default: 'pending' }
}, { versionKey: false });

taskSchema.pre('save', async function(next) {
    if (!this.isNew) { // Check if the document is new
        return next();
    }
    try {
        // Find the highest taskId in the collection
        const highestTask = await this.constructor.findOne({}, 'taskId').sort({ taskId: -1 });
        const highestTaskId = highestTask ? highestTask.taskId : 0;
        // Increment the highest taskId by 1 for the new task
        this.taskId = highestTaskId + 1;
        next();
    } catch (error) {
        next(error);
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
