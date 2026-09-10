import { Gamepad2, Github, Instagram, Linkedin } from "lucide-react";

const map = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  gamepad: Gamepad2,
};

export default function SocialIcon({ icon, size = 16 }) {
  const Cmp = map[icon] || Gamepad2;
  return <Cmp size={size} strokeWidth={1.8} />;
}
