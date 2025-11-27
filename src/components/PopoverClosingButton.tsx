export default function PopoverClosingButton({
  popovertarget,
}: {
  popovertarget: string;
}) {
  return (
    <button
      class="popover-closing"
      popovertarget={popovertarget}
      popovertargetaction="hide"
    >
      x
    </button>
  );
}
