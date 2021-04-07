import SnowflakeId from "snowflake-id";

export function convertDateFromString(dateString) {
	if (dateString) {
		var date = new Date(dateString.replace(/-/, "/"));
		return date;
	}
}

export function parseTime(time, cFormat) {
	if (time && time.replace) {
		time = time.replace(/-/g, "/");
		const d = new Date(time);
		return parseDate(d, cFormat);
	} else {
		return parseDate(time, cFormat);
	}
}

export function parseDate(date, cFormat) {
	const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	};
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key];
		if (key === "a")
			return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
		if (result.length > 0 && value < 10) {
			value = "0" + value;
		}
		return value || 0;
	});
	return time_str;
}

export function timestampToDateString(timestamp) {
	timestamp = timestamp + "";
	timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
	var date = new Date(timestamp);
	return parseTime(date);
}

export function formatTime(time, cFormat) {
	if (time && time.replace) {
		time = time.replace(/-/g, "/");
	}
	time = +time * 1000;
	const d = new Date(time);
	const now = Date.now();
	const diff = (now - d) / 1000;
	if (diff < 30) {
		return "刚刚";
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + "分钟前";
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + "小时前";
	} else if (diff < 3600 * 24 * 2) {
		return "1天前";
	}
	if (cFormat) {
		return parseTime(time, cFormat);
	} else {
		return (
			d.getMonth() +
			1 +
			"月" +
			d.getDate() +
			"日" +
			d.getHours() +
			"时" +
			d.getMinutes() +
			"分"
		);
	}
}

export function parseMoney(s, n) {
	if (!s) return 0;
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
	const l = s
		.split(".")[0]
		.split("")
		.reverse();
	const r = s.split(".")[1];
	let t = "";
	for (let i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
	}
	return (
		t
		.split("")
		.reverse()
		.join("") +
		"." +
		r
	);
}

export function formatMoney(s, type) {
	let result = s;
	if (s < 0) {
		s = 0 - s;
	}
	if (/[^0-9\\.]/.test(s)) {
		return "0.00";
	}
	if (s == null || s === "null" || s === "") {
		return "0.00";
	}
	if (type > 0) {
		s = Number(s).toFixed(type);
	}
	s = s.toString().replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	const re = /(\d)(\d{3},)/;
	while (re.test(s)) {
		s = s.replace(re, "$1,$2");
	}
	s = s.replace(/,(\d\d)$/, ".$1");
	if (type === 0) {
		const a = s.split(".");
		if (a[1] === "00") {
			s = a[0];
		}
	}
	if (result < 0) {
		result = "-" + s;
	} else {
		result = s;
	}
	return result;
}

/*
时间倒计时插件
TimeDown.js
*/
export function timeDown(endDateStr) {
	if (endDateStr && endDateStr.replace) {
		endDateStr = endDateStr.replace(/-/g, "/");
	}
	//结束时间
	var endDate = new Date(endDateStr);
	//当前时间
	var nowDate = new Date();
	//相差的总秒数
	var totalSeconds = parseInt((endDate - nowDate) / 1000);
	//天数
	var days = Math.floor(totalSeconds / (60 * 60 * 24));
	//取模（余数）
	var modulo = totalSeconds % (60 * 60 * 24);
	//小时数
	var hours = Math.floor(modulo / (60 * 60));
	modulo = modulo % (60 * 60);
	//分钟
	var minutes = Math.floor(modulo / 60);
	//秒
	var seconds = modulo % 60;
	//输出到页面
	if (days < 0) days = 0;
	if (hours < 0) hours = 0;
	if (minutes < 0) minutes = 0;
	if (seconds < 0) seconds = 0;
	var daysStr = days.toString().length === 1 ? "0" + days : days.toString();
	var hoursStr = hours.toString().length === 1 ? "0" + hours : hours.toString();
	var minutesStr =
		minutes.toString().length === 1 ? "0" + minutes : minutes.toString();
	var secondsStr =
		seconds.toString().length === 1 ? "0" + seconds : seconds.toString();
	return (
		daysStr + "天" + hoursStr + "小时" + minutesStr + "分钟" + secondsStr + "秒"
	);
}

//数字万为单位
export function tranNumber(n) {
	let numStr = n.toString();
	if (numStr.length >= 5) {
		var str = Math.round((n / 10000) * 100) / 100;
		return str + "万";
	}
	return n;
}

// 获取月的天数
export function mGetDate(year, month) {
	var d = new Date(year, month, 0);
	return d.getDate();
}

/**
 *js中更改日期
 * y年， m月， d日， h小时， n分钟，s秒
 */
export function addDate(date, part, value) {
	value *= 1;
	if (isNaN(value)) {
		value = 0;
	}
	const _date = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds()
	);
	if (part === "y") {
		_date.setFullYear(_date.getFullYear() + value);
	} else if (part === "m") {
		_date.setMonth(_date.getMonth() + value);
	} else if (part === "d") {
		_date.setDate(_date.getDate() + value);
	} else if (part === "h") {
		_date.setHours(_date.getHours() + value);
	} else if (part === "n") {
		_date.setMinutes(_date.getMinutes() + value);
	} else if (part === "s") {
		_date.setSeconds(_date.getSeconds() + value);
	}
	return _date;
}

const snowflakeId = new SnowflakeId();
// 雪花算法
export function getId() {
	return snowflakeId.generate();
}

export function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

//格式化商品价格
export function goodsPriceText(goodsInfo) {
	if (goodsInfo.isSpec === "1") {
		if (goodsInfo.minPrice === goodsInfo.maxPrice) {
			return formatMoney(goodsInfo.maxPrice);
		} else {
			return (
				formatMoney(goodsInfo.minPrice) +
				" ~ " +
				formatMoney(goodsInfo.maxPrice)
			);
		}
	} else {
		return formatMoney(goodsInfo.price);
	}
}
