import Nav from "./Nav";

export default function Header({ setTopic }) {
  return (
    <header>
      <section>
        <h1>NC News</h1>
        <Nav setTopic={setTopic} />
      </section>
    </header>
  );
}
