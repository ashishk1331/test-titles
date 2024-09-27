import { Text } from "./text";

// . meta 	yellow 	classify
// # topic 	magenta identify
//   title 	white 	text
// * args 	red 		modifier

export type TitleConfig = {
  colored: boolean;
};

type Elements = "meta" | "topic" | "title" | "args";

type ParsedObj = Record<Elements, string[]>;

export class Title {
  config: TitleConfig = {
    colored: true,
  };
  _obj: ParsedObj;

  constructor(title: string) {
    this._obj = this.parseString(title);
  }

  /**
   * The function accepts string and outputs {}.
   * */
  parseString(string: string): ParsedObj {
    const C: ParsedObj = {
      meta: [],
      topic: [],
      title: [],
      args: [],
    };

    if (typeof string !== "string" || string.length < 1) return C;

    for (const token of string.split(" ")) {
      const shavedToken = token.substring(1);
      // classifier
      if (token.startsWith(".")) {
        C.meta.push(shavedToken);

        // identifier
      } else if (token.startsWith("#")) {
        C.topic.push(shavedToken);

        // modifier
      } else if (token.startsWith("*")) {
        C.args.push(shavedToken);

        // title text
      } else {
        C.title.push(token);
      }
    }

    return C;
  }

  wrap(text: string | string[], width: number) {
    if (Array.isArray(text)) {
      text = text.join(" ");
    }

    const _resultant: string[] = [];
    while (text.length > width) {
      _resultant.push(text.substring(0, width).trim());
      text = text.substring(width);
    }
    if (text.length > 0) {
      _resultant.push(text.trim());
    }
    return _resultant;
  }

  zfill(text: string, width: number, direction: boolean = true) {
    while (text.length < width) {
      if (direction) {
        text += " ";
      } else {
        text = " " + text;
      }
    }
    return text;
  }

  updateConfig(userConfig: Partial<TitleConfig>) {
    const config = Object.create(this.config);
    for (const key in userConfig) {
      if (key in config) {
        config[key] = userConfig[key];
      }
    }
    return config;
  }

  /**
   * 	Function converts the captured data into a well parsed string.
   * */
  generate(userConfig: Partial<TitleConfig>) {
    const config = this.updateConfig(userConfig);
    const text = new Text();
    const { meta, topic, title, args } = this._obj;
    const _resultant: ParsedObj = {
      meta: [],
      topic: [],
      title: [],
      args: [],
    };
    const widths = {
      meta: 10, // 10 - 1 (space delimiter))
      topic: 10, // 10 - 1 (space delimiter))
      title: 50,
      args: 10, // 10 - 1 (space delimiter))
    };
    const color = {
      meta: "yellow",
      topic: "magenta",
      title: "white",
      args: "red",
    };

    // console.log(this._obj);

    if (meta && meta.length > 0) {
      _resultant.meta = this.wrap(meta.join(", "), widths.meta - 1);
    }

    if (topic && topic.length > 0) {
      _resultant.topic = this.wrap(topic, widths.topic - 1);
    }

    if (title && title.length > 0) {
      _resultant.title = this.wrap(title, widths.title);
    }

    if (args && args.length > 0) {
      _resultant.args = this.wrap(args, widths.args - 1);
    }

    // console.log(_resultant);

    const _text: string[] = [];
    const max_iterations = Math.max(
      ...Object.values(_resultant).map((each) => each.length),
    );

    for (let i = 0; i < max_iterations; i++) {
      let _temp = "";
      for (const key of Object.keys(_resultant)) {
        if (i < _resultant[key].length) {
          const _plain_text = this.zfill(
            _resultant[key][i],
            widths[key],
            key !== "topic",
          );
          if (config.colored) {
            _temp += text.color(_plain_text, color[key]);
          } else {
            _temp += _plain_text;
          }
        } else {
          _temp += this.zfill("", widths[key]);
        }
      }
      _text.push(_temp);
    }

    // console.log(_text.join("\n"));

    return _text.join("\n");
  }
}
