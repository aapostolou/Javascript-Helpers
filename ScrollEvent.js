const scrollEvents = [];

function ScrollEvent({
  start,
  end,
  onEnter,
  onExit,
  onFirstEnter,
  onFirstExit,
  onTopEnter,
  onTopExit,
  onBottomEnter,
  onBottomExit,
  onMoveInside,
  onMoveOutside,
  onMoveBefore,
  onMoveAfter,
  ...rest
}) {
  this.start =
    start ||
    function () {
      return 0;
    };
  this.end =
    end ||
    function () {
      return -1;
    };

  this.onEnter = onEnter || function () {};
  this.onExit = onExit || function () {};
  this.onFirstEnter = onFirstEnter || function () {};
  this.onFirstExit = onFirstExit || function () {};
  this.onTopEnter = onTopEnter || function () {};
  this.onTopExit = onTopExit || function () {};
  this.onBottomEnter = onBottomEnter || function () {};
  this.onBottomExit = onBottomExit || function () {};
  this.onMoveInside = onMoveInside || function () {};
  this.onMoveOutside = onMoveOutside || function () {};
  this.onMoveBefore = onMoveBefore || function () {};
  this.onMoveAfter = onMoveAfter || function () {};

  this.position = null;
  if (window.scrollY < start()) {
    this.position = "before";
  } else if (window.scrollY < end() || end() < start()) {
    this.position = "inside";
  } else {
    this.position = "after";
  }

  this.hasEnterOnce = false;
  this.hasExitOnce = false;

  scrollEvents.push(this);
}

ScrollEvent.prototype.run = function () {
  /* Get Current Position */
  let currentPosition = null;
  if (window.scrollY < this.start()) {
    currentPosition = "before";
  } else if (window.scrollY < this.end() || this.end() < this.start()) {
    currentPosition = "inside";
  } else {
    currentPosition = "after";
  }

  /* Run Corresponding Function */
  if (this.position === "before") {
    if (currentPosition === "inside") {
      if (!this.hasEnterOnce) {
        this.onFirstEnter();
        this.hasEnterOnce = true;
      }
      this.onTopEnter();
      this.onEnter();
    }
  }

  if (this.position === "inside") {
    if (this.position !== currentPosition) {
      if (!this.hasExitOnce) {
        this.onFirstExit();
        this.hasExitOnce = true;
      }

      if (currentPosition == "before") {
        this.onTopExit();
      } else {
        this.onBottomExit();
      }

      this.onExit();
    }
  }

  if (this.position === "after") {
    if (currentPosition === "inside") {
      if (!this.hasEnterOnce) {
        this.onFirstEnter();
        this.hasEnterOnce = true;
      }
      this.onBottomEnter();
      this.onEnter();
    }
  }

  if (currentPosition !== "inside") {
    if (currentPosition === "before") {
      this.onMoveBefore();
    } else {
      this.onMoveAfter();
    }
    this.onMoveOutside();
  } else {
    this.onMoveInside();
  }
};

const debugScrollEvents = () => {
  [...document.querySelectorAll(".scrollEvent")].forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });

  scrollEvents.forEach((event) => {
    let div = document.createElement("div");
    div.className = "scrollEvent";
    div.style.position = "absolute";
    div.style.width = "100%";
    div.style.height =
      event.end() > event.start() ? `${event.end() - event.start()}px` : "0";
    div.style.borderBottom = "1px dashed red";
    div.style.borderTop = event.end() > event.start() ? "1px dashed red" : "";
    div.style.marginTop = event.start() + "px";
    div.style.top = 0;
    div.style.pointerEvents = "none";

    document.body.append(div);
  });
};

window.addEventListener("load", () => {
  window.addEventListener("scroll", () => {
    scrollEvents.forEach((event) => {
      event.run();
    });
  });
});
