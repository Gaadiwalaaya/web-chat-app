import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUserForSideBar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filterUsers);
    } catch(error) {
        res.status(400).json({ "server error " : error.message});
    }
}

export const getMessages = async (req, res) => {
    try{
        const {id : userToChatId } = req.params;
        const myId = req.user._id

        const messages =  await Message.find({
            $or:[
                {senderId : myId, receiverId: userToChatId},
                {senderId : userToChatId, receiverId: myId },
            ]
        })

        res.status(200).json(messages);
    } catch(error) {
        res.status(400).json({"server messages "  : error.messages});
    }
}

export const 