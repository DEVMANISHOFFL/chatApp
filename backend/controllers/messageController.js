import Conversation from "../models/conversationModel.js"; // Ensure .js extension
import Message from "../models/messageModel.js"; // Import Message model

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        // Find or create conversation
        let gotConversations = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!gotConversations) {
            gotConversations = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add message to conversation
        if (newMessage) {
            gotConversations.messages.push(newMessage._id);
        }
        await gotConversations.save();

        return res.status(201).json({
            message: "Message sent successfully",
            success: true,
            newMessage,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while sending the message.",
            success: false,
            error: error.message,
        });
    }
};

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")
        
        return res.status(200).json(conversation?.messages);

    } catch (error) {
        console.log(error);

    }
}