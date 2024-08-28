import mockUsers from "./data/mockUsers.js";

export const resolveUserFromIdx = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.sendStatus(400);

  const user = mockUsers.find((user) => user.id === id);

  if (!user) return res.sendStatus(404);

  req.resolvedUser = user;
  return next();
};
