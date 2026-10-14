import express from 'express'

const router = express.Router();

router.use('/:id',(req,res)=>{
    const {roomCode} = req.params;

    if(!roomCode){
        return res.status(404).json({message:"RoomCode doesn't exist"});
    }

    return res.status(200).json({message:"RoomCode Sent Successfully",roomCode});
})

export default router;