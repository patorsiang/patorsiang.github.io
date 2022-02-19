let ghpages = require("gh-pages");
import { format } from "date-fns";

ghpages.publish(
  "out",
  {
    branch: "master",
    dotfiles: true,
    message: `🚀 Deploy [${format(
      new Date(),
      "Deploy on dd/MM/yyyy HH:mm:ss.SSSxxx"
    )}]`,
  },
  () => {
    console.log(format(new Date(), "Deploy on dd/MM/yyyy HH:mm:ss.SSSxxx"));
  }
);
