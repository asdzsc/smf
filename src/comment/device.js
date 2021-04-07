import enquireJs from "enquire.js";

const enquireScreen = function (call) {
  const hanlder = {
    match: function () {
      call && call(true);
    },
    unmatch: function () {
      call && call(false);
    }
  };
  enquireJs.register("screen and (max-width: 767.99px)", hanlder);
};

export default enquireScreen;
