const AccessSchema = require("../Schemas/AccessSchema");

const ratelimiting = async (req, res, next) => {
  try {
    const SessionId = req.session.id;
    const data = await AccessSchema.findOne({ SessionId: SessionId });
    if (!data) {
      const addSessionId = new AccessSchema({
        SessionId: SessionId,
        time: Date.now(),
      });
      await addSessionId.save();
      next();
      return;
    } else {
      let timeDifference = (Date.now() - data.time) / 1000;
      if (timeDifference < 3) {
        res.send({
          message: "Wait for some time your request has been processing",
        });
        return;
      }
      await AccessSchema.findOneAndUpdate({ SessionId }, { time: Date.now() });
      next();
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = ratelimiting;
