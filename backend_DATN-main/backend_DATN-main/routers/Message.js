const { Message } = require("../models/Message");
const { User } = require("../models/user");
const { Conversation } = require("../models/Conversation");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment-timezone");
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
};
const storage = multer.memoryStorage(); // Sử dụng memory storage để không lưu file lên đĩa
const uploadOptions = multer({ storage: storage });

// http://localhost:8080/tttn/messages?sender=655087&receiver=655087
//http://localhost:8082/tttn/message?sender=66399b1d33be22dc9c46d253,66399ac033be22dc9c46d243&receiver=66399b1d33be22dc9c46d253,66399ac033be22dc9c46d243
router.get(`/`, async (req, res) => {
  try {
    let filter = {};
    if (req.query.sender) {
      filter = { senderId: req.query.sender.split(",") };
    }
    if (req.query.receiver) {
      filter = { ...filter, receiverId: req.query.receiver.split(",") };
    }

    const messageList = await Message.find(filter)
      .select("-mess_image ")
      // .populate({
      //   path: 'category',
      //   select: 'name',
      // })
      .populate({
        path: "senderId",
        select: "-passwordHash -image -imgStore",
      })
      .populate({
        path: "receiverId",
        select: "-passwordHash -image -imgStore",
      });

    if (!messageList || messageList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No messages found" });
    }

    const formattedmessageList = await Promise.all(
      messageList.map(async (message) => {
        const senderId = await User.findById(message.senderId);
        const receiverId = await User.findById(message.receiverId);
        return {
          id: message.id,
          conversationId: message.conversationId,
          senderId: message.senderId,
          receiverId: message.receiverId,
          //   createdAt:message.createdAt,
          createdAt: moment(message.createdAt)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          // createdAt: moment(message.createdAt).tz('Asia/Ho_Chi_Minh'),
          recalled: message.recalled,
          mess_text: message.mess_text,
          mess_image: message.mess_image
            ? `/tttn/message/image/${message.id}`
            : null,
          senderId: {
            id: senderId.id,
            name: senderId.name,
            email: senderId.email,
            store: senderId.store,
            image: senderId.image ? `/tttn/user/imgUser/${senderId.id}` : null,
            imgStore: senderId.imgStore
              ? `/tttn/user/imgStore/${senderId.id}`
              : null,
            phone: senderId.phone,
            address: senderId.address,
            description: senderId.description,
            openAt: senderId.openAt,
            closeAt: senderId.closeAt,
            isStore: senderId.isStore,
            isAdmin: senderId.isAdmin,
          },
          receiverId: {
            id: receiverId.id,
            name: receiverId.name,
            email: receiverId.email,
            store: receiverId.store,
            image: receiverId.image
              ? `/tttn/user/imgUser/${receiverId.id}`
              : null,
            imgStore: receiverId.imgStore
              ? `/tttn/user/imgStore/${receiverId.id}`
              : null,
            phone: receiverId.phone,
            address: receiverId.address,
            description: receiverId.description,
            openAt: receiverId.openAt,
            closeAt: receiverId.closeAt,
            isStore: receiverId.isStore,
            isAdmin: receiverId.isAdmin,
          },
          category: message.category,
        };
      })
    );

    res.send(formattedmessageList);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", uploadOptions.single("mess_image"), async (req, res) => {
  try {
    const sender = await User.findById(req.body.senderId);
    if (!sender) {
      return res.status(400).json({ error: "Invalid senderId" });
    }

    const receiver = await User.findById(req.body.receiverId);
    if (!receiver) {
      return res.status(400).json({ error: "Invalid receiverId" });
    }

    let messageData = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      conversationId: req.body.conversationId,
      mess_text: req.body.mess_text,
    };

    let conversation = await Conversation.findOne({
      $or: [
        {
          participants: {
            $all: [messageData.senderId, messageData.receiverId],
          },
        },
        {
          participants: {
            $all: [messageData.receiverId, messageData.senderId],
          },
        },
      ],
    });
    countUnRead = 0;
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [messageData.senderId, messageData.receiverId],
        mess_text: messageData.mess_text,
        receiverId: messageData.receiverId,
        unRead: countUnRead + 1,
      });
    } else {
      // Cập nhật mess_text khi conversation đã tồn tại
      conversation.mess_text = messageData.mess_text;
      (conversation.receiverId = messageData.receiverId),
        (conversation.unRead += 1),
        await conversation.save(); // Lưu lại thay đổi vào cơ sở dữ liệu
    }

    if (req.file) {
      const isValid = FILE_TYPE_MAP[req.file.mimetype];
      if (!isValid) {
        return res.status(400).json({ error: "Invalid image type" });
      }

      messageData.mess_image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const message = new Message(messageData);
    await message.save();

    res.status(201).json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/image/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message || !message.mess_image) {
      // Sử dụng thuộc tính `mess_image`
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy hình ảnh" });
    }

    // Đặt loại nội dung và gửi dữ liệu hình ảnh
    res.contentType(message.mess_image.contentType);
    res.send(message.mess_image.data);
  } catch (error) {
    console.error("Lỗi khi truy xuất hình ảnh:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});
module.exports = router;
