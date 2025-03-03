import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";
import webpush from "web-push";

const createSubscription = asyncHandler(async (req, res) => {
  try {
    console.log("Req.body", req.body);
    const { subscription } = req.body;
    subscription.userId = req.user._id;
    const newSubscription = await Subscription.create({ ...subscription });
    if (!newSubscription)
      throw new ApiError(404, `Error while creating subscription`);
    console.log("created subscription", newSubscription);

    //creating push notification

    // const options = {
    //   vapidDetails: {
    //     subject: "mailto:myemail@example.com",
    //     publicKey: process.env.VAPID_PUBLIC_KEY,
    //     privateKey: process.env.VAPID_PRIVATE_KEY,
    //   },
    // };
    // await webpush.sendNotification(
    //   newSubscription,
    //   JSON.stringify({
    //     title: "Hello from server",
    //     description: "this message is coming from the server",
    //     image:
    //       "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
    //   }),
    //   options
    // );

    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          newSubscription,
          `Subscription added successfully !!`
        )
      );
  } catch (error) {
    throw new ApiError(404, `Error while creating subscription`, error);
  }
});

export { createSubscription };
