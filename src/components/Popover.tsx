import { ComponentChildren, JSX } from "preact";
import PopoverClosingButton from "./PopoverClosingButton";

export default function Popover({
  trigger,
  id,
  target,
}: {
  trigger: ComponentChildren;
  id: string;
  target: JSX.Element;
}) {
  return (
    <>
      <button class="popover-trigger" popovertarget={id}>
        {trigger}
      </button>
      <div id={id} popover class="popover-content">
        <PopoverClosingButton popovertarget={id} />
        {target}
      </div>
    </>
  );
}
