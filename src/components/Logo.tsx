type LogoProps = {
  size?: number;
  glow?: boolean;
};

export default function Logo({ size = 32, glow = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={glow ? 'glow-yellow' : ''}
      aria-hidden="true"
    >
      <path
        d="M24 4C15.7 4 9 10.7 9 19c0 5.4 2.8 10.1 7 12.8V36a2 2 0 002 2h12a2 2 0 002-2v-4.2c4.2-2.7 7-7.4 7-12.8 0-8.3-6.7-15-15-15z"
        fill="var(--color-yellow)"
        opacity="0.15"
      />
      <path
        d="M24 4C15.7 4 9 10.7 9 19c0 5.4 2.8 10.1 7 12.8V36a2 2 0 002 2h12a2 2 0 002-2v-4.2c4.2-2.7 7-7.4 7-12.8 0-8.3-6.7-15-15-15z"
        stroke="var(--color-yellow)"
        strokeWidth="2"
      />
      <path
        d="M20 22l3-6 2 4 3-5"
        stroke="var(--color-yellow)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="19" y1="42" x2="29" y2="42" stroke="var(--color-yellow)" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="45" x2="28" y2="45" stroke="var(--color-yellow)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
