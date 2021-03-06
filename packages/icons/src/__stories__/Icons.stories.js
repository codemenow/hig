import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { text } from "@storybook/addon-knobs";
import infoOptions from "./infoOptions";
import renderStory from "./renderStory";
import stories from "./stories";

const knobLabels = {
  color: "Color"
};

function getKnobs(props) {
  const { color, ...otherProps } = props;

  return {
    ...otherProps,
    color: text(knobLabels.color, color)
  };
}

const storybook = storiesOf("Basics|Icons", module);

stories.forEach(({ description, getProps }) => {
  storybook.add(
    description,
    withInfo(infoOptions)(() => {
      const props = getKnobs(getProps());
      return renderStory(props);
    })
  );
});
