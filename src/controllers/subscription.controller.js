import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { name, price, billingCycle,status } = req.body;

    console.log(req.user);

    const newSubscription = await Subscription.create({
      name,
      price,
      billingCycle,
      status,
      userId: req.user._id,
    });

    res
      .status(201)
      .json({ message: "Subscription created successfully.", newSubscription });
  } catch (error) {
    console.log("Error on createSubscription controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// get all subscriptions
export const getSubscriptions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      subscriptionId,
      date,
      startDate,
      endDate,
    } = req.query;

    const query = { userId: req.user._id };

    // Filter by status
    if (status) query.status = status;

    // Filter by subscriptionId
    if (subscriptionId) query._id = subscriptionId;

    // Filter by date
    if (date) {
      const filtredDate = new Date(date);
      filtredDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(filtredDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.createdAt = { $gte: filtredDate, $lt: nextDay };
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Pagination
    const skip = (page - 1) * limit;

    const subscriptions = await Subscription.find(query)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalSubscriptions = await Subscription.countDocuments(query);

    res.status(200).json({
      data: subscriptions,
      totalSubscriptions,
      totalPages: Math.ceil(totalSubscriptions / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log("Error on getSubscriptions controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// get subscription by id
export const getSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ subscription });
  } catch (error) {
    console.log("Error on getSubscription controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// update subscription by id
export const updateSubscripion = async (req, res) => {
  try {
    const { name, price, billingCycle } = req.body;
    const { id } = req.params;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      { name, price, billingCycle },
      { new: true },
    );

    res.status(200).json({
      message: "Subscription updated successfully.",
      updatedSubscription,
    });
  } catch (error) {
    console.log("Error on updateSubscripion controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// delete subscription by id
export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await Subscription.findByIdAndDelete(id);

    res.status(200).json({ message: "Subscription deleted successfully." });
  } catch (error) {
    console.log("Error on deleteSubscription controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};