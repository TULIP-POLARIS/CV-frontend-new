import { mockUsers } from "../mock/mock.user";

export const loginMock = async (username, password) => {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  return {
    success: true,
    user
  };
};