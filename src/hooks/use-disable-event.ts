export function useDisableEvent(
  onEvent?: React.EventHandler<React.SyntheticEvent>,
  disabled?: boolean
) {
  return (event: React.SyntheticEvent) => {
    onEvent?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
}
