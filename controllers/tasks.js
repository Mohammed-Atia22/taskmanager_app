const Task = require('../models/schema');
const asyncwrapper = require('../middleware/errorhandler');

const getalltasks = async (req,res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({success:true,data:{tasks,nbHits:tasks.length}});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const createtask = async (req,res)=>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const gettask = async (req,res)=>{
    try {
        const {id:taskid} = req.params;
        const task = await Task.findOne({_id:taskid});
        if(!task){
            return res.status(404).json({msg:`no task with id ${taskid}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const updatetask = async (req,res)=>{
    try {
        const id = req.params.id;
        const task = await Task.findOneAndUpdate({_id:id},req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
        if(!task){
            return res.status(404).json({msg:`no task with id ${id}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const deletetask = async (req,res)=>{
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({_id:id});
        if(!task){
            return res.status(404).json({msg:`no task with id ${id}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

module.exports = {
    getalltasks,
    createtask,
    gettask,
    updatetask,
    deletetask
}