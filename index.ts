import { Title, TitleConfig } from "./src/title";

export function t(rawString: string, config: Partial<TitleConfig> = {}) {
  return new Title(rawString).generate(config);
}
