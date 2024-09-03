import jwt from "jsonwebtoken";

export const generateToken = (user:any) => {
  const payload = {
    id: user.id,
  
  };
  return jwt.sign(payload, "jamilu", { expiresIn: "1h" });
};

