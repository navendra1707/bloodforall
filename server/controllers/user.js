import User from "../models/user.js";

function getMonthDiff(date1, date2) {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  return yearDiff * 12 + monthDiff;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  let dis;
  if (distance === 0) {
    dis = "0m";
  } else if (distance < 1) {
    dis = `${Math.round(distance * 1000, 0)}m`;
  } else {
    dis = `${Math.round(distance, 0)}km`;
  }

  return dis;
}

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      userId,
      location,
      name,
      phone,
      email,
      bloodGroup,
      gender,
      dob,
      weight,
      lastDonated,
      infection,
      hasTattoo,
      hasAids,
      hasChildBirth,
    } = req.body;

    const user = new User({
      userId,
      location: {
        type: "Point",
        coordinates: [parseFloat(location.lng), parseFloat(location.lat)],
      },
      name,
      phone,
      email,
      bloodGroup,
      gender,
      dob,
      weight,
      lastDonated,
      infection,
      hasTattoo,
      hasAids,
      hasChildBirth,
    });

    await user.save();
    res.status(201).json({
      user,
      message: "Account Created",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ userId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const findDonors = async (req, res) => {
  try {
    const { coordinates, donationArray, distance } = req.body;

    const nearbyUsers = await User.find({
      $and: [
        {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: coordinates,
              },
              $maxDistance: distance * 1000 || 5000,
            },
          },
        },
        {
          bloodGroup: { $in: donationArray },
        },
        { hasTattoo: false },
        { hasChildBirth: false },
        { hasAids: false },
      ],
    }).sort("-score");

    const updatedUsers = [];

    nearbyUsers.forEach(user => {
      if(!user.lastDonated){
        updatedUsers.push(user);
      }else{
        const lastDonated = new Date(user.lastDonated);
        const currDate = new Date();

        const months = getMonthDiff(lastDonated, currDate);
        if(months > 3){
          updatedUsers.push(user);
        }}
    })

    const users = updatedUsers.map((user) => {
      const distance = calculateDistance(
        coordinates[1],
        coordinates[0],
        user.location.coordinates[1],
        user.location.coordinates[0]
      );

      return {
        ...user._doc,
        distance,
      };
    });

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getDonatedUsers = async (req, res) => {
  try {
    const users = await User.find({
      lastDonated: { $ne: "" },
    });

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      users
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const {userId, newFields} = req.body;

    const user = await User.findOneAndUpdate(
      {userId: userId},
      {
        ...newFields
      },
      {new: true}
    );

    res.status(201).json({
      user: user
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}