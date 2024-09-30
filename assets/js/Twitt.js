class Twitt {
  constructor() {
    this._twitts = null;
  }

  getTwitts() {
    if (this._twitts === null) {
      try {
        const storedTwitts = localStorage.getItem("twitts");
        this._twitts = storedTwitts ? JSON.parse(storedTwitts) : [];
      } catch (error) {
        return (this._twitts = []);
      }
    }
    return this._twitts;
  }

  userHasLikedTwittValidate(twittId, userId) {
    // proses pemeriksaan apakah user telah memberikan like tersebut
  }

  loveTwitt(loveTwittData) {
    const { twittId, userId } = loveTwittData;

    // membuat validasi apakah user tersebut telah memberikan like pada tweet terkait
    if (this.userHasLikedTwittValidate(twittId, userId)) {
      return {
        success: false,
        error: "kamu tidak bisa memberikan like pada tweet yang sama",
      };
    }
  }

  saveTwitt(twittData) {
    // melakukan proses validasi
    const { twittContent, twittFeeling } = twittData;

    if (typeof twittContent !== "string" || twittContent.trim() === "") {
      return {
        success: false,
        error: "twitt content is missing",
      };
    }

    if (twittContent.length > 150) {
      return {
        success: false,
        error: "content is too long!",
      };
    }

    if (typeof twittFeeling !== "string" || twittFeeling.trim() === "") {
      return {
        success: false,
        error: "feeling is missing",
      };
    }

    const newTwitt = {
      id: Date.now(),
      isActive: true,
      ...twittData,
    };

    const twitts = this.getTwitts();
    twitts.push(newTwitt);

    try {
      localStorage.setItem("twitts", JSON.stringify(twitts));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
