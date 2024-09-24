import chalk from "chalk";

// . meta 	yellow 	classify
// # topic 	magenta identify
//   title 	white 	text
// * args 	red 		modifier

class Title {
	config = {
		colored: true,
	};

	constructor(title) {
		this._obj = this.parseString(title);
	}

	/**
	 * The function accepts string and outputs {}.
	 * */
	parseString(string) {
		if (typeof string !== "string") return {};

		const C = {
			meta: [],
			topic: [],
			title: [],
			args: [],
		};

		for (let token of string.split(" ")) {
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

	wrap(text, width) {
		if (Array.isArray(text)) {
			text = text.join(" ");
		}

		let _resultant = [];
		while (text.length > width) {
			_resultant.push(text.substring(0, width).trim());
			text = text.substring(width);
		}
		if (text.length > 0) {
			_resultant.push(text.trim());
		}
		return _resultant;
	}

	zfill(text, width, direction = -1) {
		while (text.length < width) {
			if (direction > 0) {
				text += " ";
			} else {
				text = " " + text;
			}
		}
		return text;
	}

	updateConfig(userConfig) {
		let config = Object.create(this.config);
		for (let key in userConfig) {
			if (key in config) {
				config[key] = userConfig[key];
			}
		}
		return config;
	}

	/**
	 * 	Function converts the captured data into a well parsed string.
	 * */
	generate(userConfig) {
		const config = this.updateConfig(userConfig);
		const { meta, topic, title, args } = this._obj;
		let _resultant = {
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
			meta: chalk.yellow,
			topic: chalk.magenta,
			title: chalk.white,
			args: chalk.red,
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

		let _text = [];
		const max_iterations = Math.max(
			...Object.values(_resultant).map((each) => each.length),
		);

		for (let i = 0; i < max_iterations; i++) {
			let _temp = "";
			for (let key of Object.keys(_resultant)) {
				if (i < _resultant[key].length) {
					const _plain_text = this.zfill(
						_resultant[key][i],
						widths[key],
						key !== "topic",
					);
					if (config.colored) {
						_temp += color[key](_plain_text);
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

export function t(rawString, config = {}) {
	return new Title(rawString).generate(config);
}
