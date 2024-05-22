const { Conversation } = require("../models/Conversation");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
};
const storage = multer.memoryStorage(); // Sử dụng memory storage để không lưu file lên đĩa
const uploadOptions = multer({ storage: storage });

// http://localhost:8080/tttn/conversations?categories=655087&conversations=655087
// router.get('/', async (req, res) => {
//   try {
//       const conversationList = await Conversation.find();

//       if (!conversationList) {
//           return res.status(500).json({ success: false, error: "Error fetching categories" });
//       }

//       res.status(200).json(conversationList);
//   } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//   }
// });

router.get(`/`, async (req, res) => {
  try {
    let filter = {};
    if (req.query.participant) {
      filter = { participants: { $in: req.query.participant.split(",") } };
    }
    const conversationList = await Conversation.find(filter).populate({
      path: "participants",
      select: "-image -passwordHash -imgStore",
    });

    if (!conversationList || conversationList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No conversations found" });
    }

    const formattedConversationList = conversationList.map((conversation) => {
      // Lấy tất cả người tham gia không phải là người nhận
      const participantsExcludingReceiver = conversation.participants;

      // Định dạng danh sách người tham gia
      const formattedParticipants = participantsExcludingReceiver.map(
        (userId) => ({
          id: userId._id,
          name: userId.name,
          email: userId.email,
          store: userId.store,
          image: userId.image ? `/tttn/user/imgUser/${userId._id}` : null,
          imgStore: userId.imgStore
            ? `/tttn/user/imgStore/${userId._id}`
            : null,
          phone: userId.phone,
          address: userId.address,
          description: userId.description,
          openAt: userId.openAt,
          closeAt: userId.closeAt,
          isStore: userId.isStore,
          isAdmin: userId.isAdmin,
        })
      );

      return {
        _id: conversation._id,
        participants: conversation.participants,
        mess_text: conversation.mess_text,
        unRead: conversation.unRead,
        receiverId: conversation.receiverId,
        users: formattedParticipants, // Danh sách người tham gia không phải là người nhận
      };
    });

    res.status(200).send(formattedConversationList);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while processing your request",
      });
  }
});

router.get(`/111`, async (req, res) => {
  try {
    const conversationList = await Conversation.find().populate({
      path: "participants",
      select: "-image -passwordHash -imgStore",
    });

    if (!conversationList || conversationList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No conversations found" });
    }

    const formattedConversationList = conversationList.map((conversation) => {
      // Giả sử userId đã được populate
      const userId = conversation.participants.find(
        (p) => p._id.toString() !== conversation.receiverId
      );
      return {
        _id: conversation._id,
        participants: conversation.participants,
        mess_text: conversation.mess_text,
        unRead: conversation.unRead,
        receiverId: conversation.receiverId,
        userId: {
          id: userId._id,
          name: userId.name,
          email: userId.email,
          store: userId.store,
          image: userId.image ? `/tttn/user/imgUser/${userId._id}` : null,
          imgStore: userId.imgStore
            ? `/tttn/user/imgStore/${userId._id}`
            : null,
          phone: userId.phone,
          address: userId.address,
          description: userId.description,
          openAt: userId.openAt,
          closeAt: userId.closeAt,
          isStore: userId.isStore,
          isAdmin: userId.isAdmin,
        },
      };
    });

    res.status(200).send(formattedConversationList);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while processing your request",
      });
  }
});

router.get("/113", async (req, res) => {
  try {
    const conversations = await Conversation.find().populate({
      path: "participants",
      select: "-image -passwordHash -imgStore",
    });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post('/', uploadOptions.single('mess_image'), async (req, res) => {
//     try {
//       const sender = await User.findById(req.body.userId);
//       if (!sender) {
//         return res.status(400).json({ error: 'Invalid userId' });
//       }

//       const receiver = await User.findById(req.body.receiverId);
//       if (!receiver) {
//         return res.status(400).json({ error: 'Invalid receiverId' });
//       }

//       let conversationData = {
//         userId: req.body.userId,
//         receiverId: req.body.receiverId,
//         conversationId: req.body.conversationId,
//         mess_text: req.body.mess_text
//       };

//       if (req.file) {
//         const isValid = FILE_TYPE_MAP[req.file.mimetype];
//         if (!isValid) {
//           return res.status(400).json({ error: 'Invalid image type' });
//         }

//         conversationData.mess_image = {
//           data: req.file.buffer,
//           contentType: req.file.mimetype
//         };
//       }

//       const conversation = new conversation(conversationData);
//       await conversation.save();

//       res.status(201).json({ conversation: 'conversation added successfully' });
//     } catch (error) {
//       console.error('Error creating conversation:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   router.get('/image/:id', async (req, res) => {
//     try {
//       const conversation = await conversation.findById(req.params.id);

//       if (!conversation || !conversation.mess_image) { // Sử dụng thuộc tính `mess_image`
//         return res.status(404).json({ success: false, conversation: 'Không tìm thấy hình ảnh' });
//       }

//       // Đặt loại nội dung và gửi dữ liệu hình ảnh
//       res.contentType(conversation.mess_image.contentType);
//       res.send(conversation.mess_image.data);
//     } catch (error) {
//       console.error('Lỗi khi truy xuất hình ảnh:', error);
//       res.status(500).json({ success: false, conversation: 'Lỗi máy chủ nội bộ' });
//     }
//   });
module.exports = router;
