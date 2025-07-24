interface OverlayProps {
  onClick: Function;
}
export default function Overlay({ onClick }: OverlayProps) {
  return (
    <div
      className="bg-black opacity-80 w-full h-full absolute top-0 left-0 z-40"
      onClick={() => {
        onClick();
      }}
    ></div>
  );
}
