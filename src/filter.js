function filter(target, rule) {
	
	if (!target) {
		throw new TypeError('"target" is null or not defined');
	}

	var _showAll = true;
	var _rkeys = Object.keys(rule);

	// 是否显示所有，就是如果规则中只定义了哪些不显示（为0）的情况下，除了为0的，其他都默认显示
	for (var _i = 0, _len = _rkeys.length; _i < _len; _i++) {
		if (_showAll && rule[_rkeys[_i]] === 1) {
			_showAll = false;
			break;
		}
	}
	
	var _filterObj = function(o) {
		
		// 如果不是对象，直接还回去
		if (({}).toString.call(o) !== '[object Object]') {
			return o;
		}
		
		// 声明返回的对象
		var _res = {};
		
		// 如果显示所有，默认把不为0的所有值再还回来
		if (_showAll) {
			_res = Object.assign({}, o);
			for (var _k = 0, _len = _rkeys.length; _k < _len; _k++) {
				var _j = _rkeys[_k];
				var _r = rule[_j];
				if (_r === 0 && _res[_j]) {
					delete _res[_j]
				}
			}
		}
		
		// 过滤
		for (var _j = 0, _len = _rkeys.length; _j < _len; _j++) {
			var _k = _rkeys[_j];
			var _r = rule[_k];
			var _isFn = ({}).toString.call(_r) === '[object Function]'
			
			// 如果规则是个function
			if (_isFn) {
				_res[_k] = _r.call(null, o[_k])
			}
			// 如果filter需要显示但返回数据中没有，填入
			else if (_r === 1 && _res[_k] === undefined) {
				_res[_k] = o[_k];
			}
			// 如果filter是个代理，找到被代理的数据
			else if ((/^\$/).test(_r)) {
				_r = _r.replace(/^\$/, '');
				if (o[_r] !== undefined) {
					_res[_k] = o[_r];
				}
			}
		}
		
		// 返回整理好的数据
		return _res;
	}
	
	// 如果传入的是个对象
	if (({}).toString.call(target) === '[object Object]') {
		return _filterObj(target)
	}
	// 如果是个数组
	else if (({}).toString.call(target) === '[object Array]') {
		var res = []
		for (var k = 0; k < target.length; k++) {
			res.push(_filterObj(target[k]));
		}
		return res
	}
	// 如果什么都不是
	else {
		throw new TypeError('the type of "target" is not object or array');
	}
}

module.exports = filter
