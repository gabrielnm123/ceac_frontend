import Image from "next/image";

export default function Home() {
  return (
    <script
      dangerouslySetInnerHTML={{__html: `
        window.location.replace('/colaborador');
      `}}
    />
  );
}
