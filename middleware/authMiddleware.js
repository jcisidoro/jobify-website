import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const checkForTestUser = (req, res, next) => {
  console.log(req.user);
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "67da15692def5101d96287a9";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
