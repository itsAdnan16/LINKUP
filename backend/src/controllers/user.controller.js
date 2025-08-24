import User from "../Models/User.js"
import FriendRequest from "../Models/FriendRequest.js"

const getRecommendedUsers = async(req,res)=>{
    try{

        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and:[
                {_id: {$ne: currentUserId}}, //exclude current user
                {_id: {$nin: currentUser.friends}},// exclude all the friends
                {isOnboarded: true},
            ]
        })
        res.status(200).json({
            recommendedUsers
        })
    }catch(error){
        console.log("Error in getRecommendedUsers controller",error);
        res.status(500).json({message:"Error in getRecommendedUsers controller"})
    }
}

const getMyFriends = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(user.friends);
    }catch(error){
        console.log("Error in getMyFriends controller",error);
        res.status(500).json({message:"Error in getMyFriends controller"})
    }
}

const sendFriendRequest = async(req,res)=>{
    try{
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        //prevent sending request to yourself
        if(myId === recipientId){
            return res.status(400).json({message:"You cannot send friend request to yourself"})
        }

        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(400).json({message:"Recipient/User not found"});
        }

        //check if user is already friends
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"});
        }

        //check if a req already exists
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId}
            ]
        })
        if(existingRequest){
            return res
            .status(400)
            .json({message:"Friend request already exists between you and this user"})
        }

        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient: recipientId
        })

        res.status(200).json({
            friendRequest
        })
    }
    catch(error){
        console.log("Error in sendFriendRequest controller",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const acceptFriendRequest = async(req,res)=>{
    try {
        const { id: requestId } = req.params;
    
        const friendRequest = await FriendRequest.findById(requestId);
    
        if (!friendRequest) {
          return res.status(404).json({ message: "Friend request not found" });
        }
    
        // Verify the current user is the recipient
        if (friendRequest.recipient.toString() !== req.user.id) {
          return res.status(403).json({ message: "You are not authorized to accept this request" });
        }
    
        friendRequest.status = "accepted";
        await friendRequest.save();
    
        // add each user to the other's friends array
        // $addToSet: adds elements to an array only if they do not already exist.
        await User.findByIdAndUpdate(friendRequest.sender, {
          $addToSet: { friends: friendRequest.recipient },
        });
    
        await User.findByIdAndUpdate(friendRequest.recipient, {
          $addToSet: { friends: friendRequest.sender },
        });
    
        res.status(200).json({ message: "Friend request accepted" });
      } catch (error) {
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}
const getFriendRequests = async(req,res)=>{
    try {
        const incomingRequests = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage")

        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status:"accepted"
        }).populate("recipient","fullName profilePic nativeLanguage learningLanguage")

        return res.status(200).json(
            {
                incomingRequests,
                outgoingRequests
            }
        )

    } catch (error) {
        console.log("Error in getFriendRequests controller",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getOutgoingFriendRequests = async(req,res)=>{
    try {
        const incomingReqs = await FriendRequest.find({
          recipient: req.user.id,
          status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");
    
        const acceptedReqs = await FriendRequest.find({
          sender: req.user.id,
          status: "accepted",
        }).populate("recipient", "fullName profilePic");
    
        res.status(200).json({ incomingReqs, acceptedReqs });
      } catch (error) {
        console.log("Error in getPendingFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export {getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendRequests}