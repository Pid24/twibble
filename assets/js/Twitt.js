class Twitt {
  constructor() {
    this._twitts = null;
    this._loveTwitts = null;
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
    const loveTwitts = this.getLoveTwitts();

    return loveTwitts.some((twitt) => twitt.twittId === twittId && twitt.userId === userId);
  }

  getLoveTwitts() {
    if (this._loveTwitts === null) {
      try {
        const storedLoveTwitts = localStorage.getItem("loveTwitts");
        this._loveTwitts = storedLoveTwitts ? JSON.parse(storedLoveTwitts) : [];
      } catch (error) {
        return (this._loveTwitts = []);
      }
    }
    return this._loveTwitts;
  }

  deleteTwitt(twittId) {
    const index = this.getTwitts().findIndex((twitt) => twitt.id === twittId);
    if (index !== -1) {
      this._twitts.splice(index, 1);
      try {
        localStorage.setItem("twitts", JSON.stringify(this._twitts));
        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: "twitt tidak ditemukan",
        };
      }
    }
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

    const newLoveTwitt = {
      id: Date.now(),
      ...loveTwittData,
    };

    const loveTwitts = this.getLoveTwitts();

    loveTwitts.push(newLoveTwitt);

    try {
      localStorage.setItem("loveTwitts", JSON.stringify(loveTwitts));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
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
