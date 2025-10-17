export default function CenieLogo({ color = "white" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137 137">
      <path
        fill={color}
        d="M130 106c-10.3-2.5-17.9-11.8-17.9-22.8V66.6c0-24.1-19.5-43.6-43.6-43.6S24.9 42.5 24.9 66.6v16.5c0 11-7.5 20.3-17.8 22.8h-.2V66.5q0-3.15.3-6.3C10.5 29.3 36.6 5.1 68.5 5.1s58.1 24.3 61.2 55.3c.2 2 .3 4.1.3 6.2zM7 113.9h123v18H7z"
      />
    </svg>
  );
}
