import axios from "./axios-customize";
const apikey = "tttn";
const GetConversationById = (participant) => {
  return axios.get(`/${apikey}/conversation?participant=${participant}`, {});
};
const GetMessById = (sender, receiver) => {
  return axios.get(
    `/${apikey}/message?sender=${sender},${receiver}&receiver=${sender},${receiver}`,
    {}
  );
};
export { GetConversationById, GetMessById };
