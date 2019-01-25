function stylesheet(props, trackValueRatio, themeData) {
  const { disabled, hasFocus, hasHover, isPressed } = props;

  const thumbPseudoElements = {
    microsoft: "::-ms-thumb",
    mozilla: "::-moz-range-thumb",
    webkit: "::-webkit-slider-thumb"
  };

  const trackPseudoElements = {
    microsoft: "::-ms-track",
    mozilla: "::-moz-range-track",
    webkit: "::-webkit-slider-runnable-track"
  };

  const trackProgressPseudoElements = {
    // WebKit does not have a pseudo element to target this styling, so we achieve it with fancy styling on track
    // ::-webkit-slider-runnable-track
    microsoft: "::-ms-fill-lower",
    mozilla: "::-moz-range-progress"
  };

  function browserSpecificPseudoElementRules(
    browserPseudoElements,
    rules,
    singleBrowserInclusions
  ) {
    const styles = {};

    Object.entries(browserPseudoElements).forEach(browserPseudoElement => {
      let pseudoElementRules = rules;

      const browser = browserPseudoElement[0];
      const pseudoElement = browserPseudoElement[1];

      if (singleBrowserInclusions && singleBrowserInclusions[browser]) {
        pseudoElementRules = {
          ...rules,
          ...singleBrowserInclusions[browser]
        };
      }

      styles[`&${pseudoElement}`] = pseudoElementRules;
    });

    return styles;
  }

  const baseRules = {
    WebkitAppearance: "none" /* Hides platform-native styling */,
    width: "100%" /* Specific width is required for Firefox. */,
    backgroundColor: "transparent" /* Otherwise white in Chrome */,
    boxSizing: "content-box",
    height: "20px",
    margin: 0,
    position: "relative",
    outline: "none",

    "&::-ms-tooltip": {
      display: "none"
    },

    "&::-moz-focus-outer": {
      border: 0
    }
  };

  const thumbDisabledRules = disabled
    ? {
        opacity: themeData["slider.disabled.opacity"]
      }
    : {};

  const thumbFocusedRules =
    !disabled && hasFocus
      ? {
          outline: "none",
          backgroundColor: themeData["slider.focused.thumb.color"],
          boxShadow: `0 0 0 ${themeData["slider.focused.halo.width"]} ${
            themeData["slider.focused.halo.color"]
          }`
        }
      : {};

  const thumbHoverRules =
    !disabled && hasHover
      ? {
          backgroundColor: themeData["slider.hover.thumb.color"],
          boxShadow: `0 0 0 ${themeData["slider.hover.halo.width"]} ${
            themeData["slider.hover.halo.color"]
          }`
        }
      : {};

  const thumbPressedRules =
    !disabled && isPressed
      ? {
          backgroundColor: themeData["slider.pressed.thumb.color"],
          boxShadow: `0 0 0 ${themeData["slider.pressed.halo.width"]} ${
            themeData["slider.pressed.halo.color"]
          }`
        }
      : {};

  const thumbRules = browserSpecificPseudoElementRules(
    thumbPseudoElements,
    {
      ...{
        boxSizing: "content-box",
        height: themeData["slider.thumb.width"],
        width: themeData["slider.thumb.width"],
        backgroundColor: themeData["slider.thumb.backgroundColor"],
        border: 0,
        borderRadius: "50%",
        boxShadow: `0 0 0 ${themeData["slider.halo.width"]} ${
          themeData["slider.halo.color"]
        }`,
        position: "relative",
        top: "50%",
        WebkitAppearance: "none" /* Hides platform-native styling */
      },

      ...thumbFocusedRules,
      ...thumbHoverRules,
      ...thumbPressedRules
    },
    {
      mozilla: {
        ...thumbDisabledRules
      },
      webkit: {
        transform: "translateY(-50%)"
      }
    }
  );

  const trackDisabledRules = disabled
    ? {
        opacity: themeData["slider.disabled.opacity"]
      }
    : {};

  const trackValueWidth = `calc((0.5 * ${themeData["slider.thumb.width"]}) 
  + (${trackValueRatio} * (100% - ${themeData["slider.thumb.width"]})))`;

  const trackRules = browserSpecificPseudoElementRules(
    trackPseudoElements,
    {
      width: "100%",
      height: themeData["slider.track.width"],
      border: "none",
      backgroundColor: themeData["slider.track.color"],
      color: "transparent",
      outline: "none",

      ...trackDisabledRules
    },
    {
      // WebKit does not have a built-in way to target the progress/lower fill of a slider track.
      // This produces the same visual effect.
      webkit: {
        backgroundColor: themeData["slider.track.color"],
        backgroundImage: `linear-gradient(${themeData["slider.value.color"]}, ${
          themeData["slider.value.color"]
        })`,
        backgroundPosition: 0,
        backgroundSize: `${trackValueWidth} 100%`,
        backgroundRepeat: "no-repeat"
      }
    }
  );

  const trackProgressRules = browserSpecificPseudoElementRules(
    trackProgressPseudoElements,
    {
      border: "none",
      backgroundColor: themeData["slider.value.color"]
    },
    {
      mozilla: {
        ...trackDisabledRules
      }
    }
  );

  return {
    slider: {
      ...baseRules,
      ...thumbRules,
      ...trackRules,
      ...trackProgressRules
    }
  };
}

export default stylesheet;
