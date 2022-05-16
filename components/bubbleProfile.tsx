import { profileImage } from "../res/data";

const BgBubble = ({}: {}) => (
  <img src={profileImage} loading="lazy" className="w-full rounded-[47.5%]" />
);

export default BgBubble;
