const express = require('express')
const members = require('../../Members')
const uuid = require('uuid')
const router = express.Router()

router.get('/',(req,res) =>{
    res.json(members)
})

//member id
router.get('/:mid',(req,res) =>{
    console.log(req.params)
    const found = members.some(member => member.id === parseInt(req.params.mid))
    if(found){
    res.status(200).json({msg:'Member founded',member:members.filter(member => member.id === parseInt(req.params.mid))})
    }else{
    res.status(400).json({msg:`No member found with the id of ${req.params.mid}`})        
    }
})

router.post('/',(req,res) =>{
    console.log(req.body)
    if(!req.body.name || !req.body.email){
        res.status(400).json({msg:'Please fill all the Fields!!!'})
    }
    const newMember = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'inactive'
    }
    members.push(newMember)
    res.status(200).json({msg:'Member Added',members})
})

router.delete('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
    const users = members.filter(member => member.id !== parseInt(req.params.id))
    res.status(200).json({msg:'Member Deleted!!!',xyzmembers:users}) 
    }else{
        res.status(400).json({msg:`No member found with the id of ${req.params.id}`})
    }
})

router.put('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        //const upMember = req.body;
        members.forEach(member=>{
            if(member.id === parseInt(req.params.id)){
                member.name = req.body.name;
                member.email = req.body.email;
                res.json({msg:'Member found',member})
            }
        })
    }else{
        res.status(400).json({error:`No member found with id of ${req.params.id}`})
    }
})

module.exports = router