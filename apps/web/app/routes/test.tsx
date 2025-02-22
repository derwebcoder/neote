import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Web Test" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <p>
    This is the test page
  </p>;
}
