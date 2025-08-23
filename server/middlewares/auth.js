import jwt from "jsonwebtoken";
const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return response.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;

    next();
  } catch (error) {
    return response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;

// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   try {
//     // Log headers & cookies
//     console.log("Headers:", req.headers);
//     console.log("Cookies:", req.cookies);

//     // Extract token
//     const token =
//       req.cookies?.accessToken ||
//       (req.headers?.authorization?.startsWith("Bearer ")
//         ? req.headers.authorization.split(" ")[1]
//         : null);

//     if (!token) {
//       console.log("No token provided");
//       return res.status(401).json({
//         message: "Provide token",
//         error: true,
//         success: false,
//       });
//     }

//     // Verify token
//     const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
//     req.userId = decode.id || decode.userId;

//     console.log("UserId from auth middleware:", req.userId);

//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error.message);
//     return res.status(401).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;
