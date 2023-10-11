import reminderModel from "../models/reminderModel.js";


const reminderController = async (req, res) => {
    try {
        const { userId, name, title, description, time, Phone2, Phone1,isEmail, isWhatsapp, isSMS } = req.body;
        //validation
        if (!title || !time ) {
            return res.send({ error: ' This field is required' })
        }

        const reminder = await new reminderModel({
            userId,name, title, description, time, Phone2, Phone1, isEmail, isWhatsapp, isSMS
        }).save();
        res.status(201).send({
            success: true,
            message: "Reminder set successfully",
            reminder,
        })
    }
    catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error setting reminder',
            error
        })
    }
}

const existingReminder = async (req, res) => {
    try {
        const Uid = req.params.Uid;
        const reminders = await reminderModel.find({userId:Uid});
        res.status(201).send({ success: true, message: "success", reminders });
    } catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'get error',
            error
        })
    }

}
const delReminder = async (req, res) => {
    try {
        const { Rid } = req.params;
        const deleted = await reminderModel.deleteOne({ _id: Rid });
        res.status(201).send({
            success: true,
            message: "Reminder deleted",
            deleted,
        });
    } catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'delete error',
            error
        })
    }
}

export {reminderController,existingReminder,delReminder}