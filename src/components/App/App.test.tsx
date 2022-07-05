import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "~/components/App/App";

test("renders correctly", () => {
  const container = render(<App />);
  expect(container).toMatchSnapshot();
});
